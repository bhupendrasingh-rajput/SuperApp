import React from 'react'
import '../Components/Registration/Registration.css';
import Banner from '../Components/Registration/Banner';
import SignupForm from '../Components/Registration/SignupForm';

const RegistrationPage = () => {
    return (
        <div className="registration-page">
            <Banner />
            <SignupForm />
        </div>
    )
}

export default RegistrationPage;