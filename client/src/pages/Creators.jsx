import React, { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js';
import { PaymentElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';

// Donations allows users to make a donation to support the app.
// The CheckoutForm component returns a form that the user can fill out to make a donation.
const CheckoutForm = () => {
    // useStripe and useElements hooks from @stripe/react-stripe-js are used to access the Stripe.js and Elements objects.
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState(null);

    // The handleSubmit function handles the form submission event.
    // If Elements has not yet loaded, it returns early.
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (elements == null) {
            return;
        }

    };

    // Returns a form that the user can fill out to make a donation.
    // Includes a PaymentElement component, which is a pre-built UI component for collecting card details.
    // Submit button is disabled if Stripe or Elements has not yet loaded.
    return (
        <form className=' mx-auto px-5 py-10 bg-white shadow-md rounded-lg text-center max-w-xl' onSubmit={handleSubmit}>
            <h2 className='text-2xl font-bold mb-4'>Support Our App</h2>
            <p className='mb-4'>Your contribution will help us continue to deliver quality services.  
            
            Thank you for your generous support.</p>
            <PaymentElement />
            <button type='submit' disabled={!stripe || !elements}>
                Pay
            </button>
            {errorMessage && <div>{errorMessage}</div>}
        </form>
    );
};
// The loadStripe function from Stripe.js is used to initialize Stripe with a publishable API key.  
// The returned promise is stored in stripePromise.
const stripePromise = loadStripe("pk_test_51PCUAkHBeNaBY6kmxzPxOwO3wyLshViLwsLxxVwxct9feUeQYupYnDp3MuQqmsmGEaRPDCBYVPtE24rrJaNMLhJ500FjwIkslr");
    // The Donations component returns an Elements provider from @stripe/react-stripe-js, which wraps the CheckoutForm component.
    // This provider component makes Stripe.js and Elements available to all components in the app.
    const Creators = () => {
        return (
            <Elements stripe ={stripePromise} options={{ mode: 'setup', currency: 'usd' }}>
                <CheckoutForm />
            </Elements>
        );
    };

export default Creators;
