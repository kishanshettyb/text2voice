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

    // Retrieve customer details
    const customer = await stripe.customers.retrieve(customerId)

    // Get the customer's email
    const customerEmail = customer.email

    console.log('Customer Email:', customerEmail)

    // Example: Store payment data
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
    // Save paymentData to your database
    await savePaymentDataToDatabase(paymentData)
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
    console.log('Payment data saved:', response.data)
  } catch (error) {
    console.error('Error saving payment data:', error)
  }
}
