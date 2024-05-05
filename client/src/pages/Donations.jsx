import React, { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js';
import { PaymentElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (elements == null) {
            return;
        }

    };

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

const stripePromise = loadStripe("pk_test_51PCUAkHBeNaBY6kmxzPxOwO3wyLshViLwsLxxVwxct9feUeQYupYnDp3MuQqmsmGEaRPDCBYVPtE24rrJaNMLhJ500FjwIkslr");

    const Donations = () => {
        return (
            <Elements stripe ={stripePromise} options={{ mode: 'setup', currency: 'usd' }}>
                <CheckoutForm />
            </Elements>
        );
    };

export default Donations;
