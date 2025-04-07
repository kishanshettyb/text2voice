// src/app/api/webhook/route.js

import Stripe from 'stripe'
// import { NextRequest } from 'next/server'

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

  // Process the event here
  console.log('Received event:', event)

  // Store data in payments
  if (event.type === 'checkout.session.completed') {
    // Example: Store payment data
    const paymentData = {
      paymentIntent: event.data.object.payment_intent,
      amount: event.data.object.amount_total
    }

    // Save paymentData to your database
    await savePaymentDataToDatabase(paymentData)
  }

  return new Response('Webhook received', { status: 200 })
}

async function savePaymentDataToDatabase(data) {
  // Implement logic to save data to your database here
  console.log(JSON.stringify(data))
}
