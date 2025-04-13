import axios from 'axios'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST(request) {
  const body = await request.text()
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET
  const sig = request.headers.get('stripe-signature')
  let event

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`)
    return new Response(`Webhook Error: ${err.message}`, { status: 400 })
  }

  // Store data in payments
  if (event.type === 'checkout.session.completed') {
    console.log('Received event:', event)
    const customerId = event.data.object.customer
    const customer = await stripe.customers.retrieve(customerId)
    const customerEmail = customer.email
    // Retrieve subscription details
    const subscriptionId = event.data.object.subscription // Subscription ID from the session
    const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
      expand: ['items.data.price.product']
    })

    // Get subscribed product IDs
    const productIds = subscription.items.data.map((item) => item.price.product)

    console.log('Subscribed Product IDs:', productIds)
    const paymentData = {
      data: {
        customer_email: customerEmail,
        checkout_session_id: event.data.object.id,
        customer_id: event.data.object.customer,
        amount: event.data.object.amount_total,
        currency: event.data.object.currency,
        payment_status: event.data.object.payment_status
      }
    }
    const paymentResponse = await savePaymentDataToDatabase(paymentData)
    console.log(paymentResponse)

    // Update subscription table
    if (event.data.object.payment_status === 'paid') {
      const stripe_subscription_id = event.data.object.id
      await updateSubscriptionTable(customerEmail, stripe_subscription_id, productIds)
    }
  }

  return new Response('Webhook received', { status: 200 })
}

async function savePaymentDataToDatabase(data) {
  const token = process.env.NEXT_PUBLIC_STRAPI_ADMIN_TOKEN
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/payments`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    console.log('saved Payment data to payment table')
    return response.data
  } catch (error) {
    console.error('Error saving payment data:', error)
  }
}

async function updateSubscriptionTable(customerEmail, stripe_subscription_id, productIds) {
  const token = process.env.NEXT_PUBLIC_STRAPI_ADMIN_TOKEN

  try {
    // Retrieve user ID by email
    const userResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/users?filters[email][$eq]=${customerEmail}&populate=subscription`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    const user = userResponse.data[0] // Assuming only one match
    if (!user) {
      console.error('No user found with the provided email.')
      return
    }
    let updatedPlan
    const planMap = {
      [process.env.NEXT_PUBLIC_CREATOR_MONTHLY_PRODUCT_ID]:
        process.env.NEXT_PUBLIC_CREATOR_MONTHLY_PLAN_ID,
      [process.env.NEXT_PUBLIC_UNLIMITED_MONTHLY_PRODUCT_ID]:
        process.env.NEXT_PUBLIC_UNLIMITED_MONTHLY_PLAN_ID,
      [process.env.NEXT_PUBLIC_CREATOR_YEARLY_PRODUCT_ID]:
        process.env.NEXT_PUBLIC_CREATOR_YEARLY_PLAN_ID,
      [process.env.NEXT_PUBLIC_UNLIMITED_YEARLY_PRODUCT_ID]:
        process.env.NEXT_PUBLIC_UNLIMITED_YEARLY_PLAN_ID
    }
    const matchingProduct = productIds.find((product) => planMap[product.id])
    if (matchingProduct) {
      updatedPlan = planMap[matchingProduct.id]
    }
    // if (
    //   productIds.some(
    //     (product) => product.id === process.env.NEXT_PUBLIC_CREATOR_MONTHLY_PRODUCT_ID
    //   )
    // ) {
    //   updatedPlan = process.env.NEXT_PUBLIC_CREATOR_MONTHLY_PLAN_ID
    // }
    // Update subscription table
    const subscriptionUpdateData = {
      data: {
        subscription_status: 'active',
        stripe_subscription_id: stripe_subscription_id,
        plan: updatedPlan
      }
    }
    console.log(subscriptionUpdateData)
    console.log(user.email, user.subscription)

    const subscriptionResponse = await axios.put(
      `${process.env.NEXT_PUBLIC_BASE_URL}/subscriptions/${user.subscription.documentId}`,
      subscriptionUpdateData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )

    console.log('Subscription updated successfully:', subscriptionResponse.data)
  } catch (error) {
    console.error('Error updating subscription:', error)
  }
}
