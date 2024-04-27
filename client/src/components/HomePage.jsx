import React from 'react';
import App from '../App.jsx';
import LoginForm from './LoginForm.jsx';

const HomePage = () => {
    return (
        <div>
            <LoginForm />
            <App />
        </div>
    )
}

export default HomePage;