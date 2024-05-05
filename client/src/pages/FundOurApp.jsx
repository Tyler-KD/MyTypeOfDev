import React, { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

    const CheckoutForm = () => {
        // Get Stripe.js instance
        const stripe = useStripe;
        const elements = useElements();

        const handleSubmit = async (event) => {
            event.preventDefault();

            if (!stripe || !elements) {
                return;
            }
            const result = await stripe.confirmCardPayment(stripePromise, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            });

            if (result.error) {
                console.log(result.error.message);
            } else {
                if (result.paymentIntent.status === 'succeeded') {
                    console.log('Payment succeeded');
                }
            }
        };

        return (
            <form onSubmit={handleSubmit}>
                <CardElement />
                <button type='submit' disabled={!stripe}>
                    Donate
                </button>

            </form>
        )
    };

    const FundOurApp = () => {
        return (
            <div className='flex justify-center items-center min-h-screen'>
                <div id='payment-form' className='w-96 p-8 bg-white rounded shadow-xl'>
                    <h2 className='text-2xl mb-4 text-center'>Donate to Our Cause</h2>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm/>
                    </Elements>
                </div>
            </div>
        )
    };

export default FundOurApp
