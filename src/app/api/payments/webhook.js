import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRAPI_ADMIN_TEST_STRIPE_SECRET_KEY)

export async function POST(req) {
  const sig = req.headers.get('stripe-signature')
  const body = await req.text()

  try {
    // Verify webhook signature
    const event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET)

    // Handle successful payment
    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object

      // Store in your database (e.g., PostgreSQL, MySQL, etc.)
      // await savePaymentToDatabase(paymentIntent)
      console.log(JSON.stringify(paymentIntent))
      console.log('success')
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    console.error('Webhook Error:', err)
    return NextResponse.json({ error: 'Webhook failed' }, { status: 400 })
  }
}

// Save payment to database (replace with your DB logic)
// async function savePaymentToDatabase(payment) {
//   const dbResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/payments`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       payment_id: payment.id,
//       amount: payment.amount / 100, // Convert cents to dollars
//       currency: payment.currency,
//       payment_status: payment.status,
//       customer_id: payment.customer
//     })
//   })
//   return dbResponse.json()
// }
