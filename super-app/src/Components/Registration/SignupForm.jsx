import React, { useState } from 'react';
import './Registration.css';

const SignupForm = () => {
    const [userData, setUserData] = useState({
        name: '',
        username: '',
        email: '',
        mobile: '',
    });

    const [inputError, setInputError] = useState({
        name: '',
        username: '',
        email: '',
        mobile: '',
    });

    const [isChecked, setIsChecked] = useState(false);
    const [checkError, setCheckError] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        if (type === 'checkbox') {
            setIsChecked(checked);
            setCheckError('');
        } else {
            setUserData({ ...userData, [name]: value });
            setInputError({ ...inputError, [name]: '' });
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setTermsAccepted(true);
        const currentErrors = {};

        if (userData.name.trim() === '') {
            currentErrors.name = "Field is required";
        }
        if (userData.username.trim() === '') {
            currentErrors.username = "Field is required";
        }
        if (userData.email.trim() === '') {
            currentErrors.email = "Field is required";
        }
        if (userData.mobile.trim() === '') {
            currentErrors.mobile = "Field is required";
        }

        setInputError(currentErrors);

        if (isChecked === false) {
            setCheckError('Check this box if you want to proceed');
            return;
        }

        if (Object.keys(currentErrors).length === 0) {
            localStorage.setItem('userData', JSON.stringify(userData));
            console.log('Form submitted:', userData);
            console.log(termsAccepted);
        }
    }
  return (
    <div className="form-container">
                <div className="form-heading">
                    <p id="app-name">Super app</p>
                    <p id="app-heading">Create your new account</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <input type="text"
                        className={`form-input ${inputError.name ? "missing-error" : ""}`}
                        placeholder='Name' name='name' value={userData.name}
                        onChange={handleChange}
                    />
                    {inputError.name && <p className='error-msg'>{inputError.name}</p>}

                    <input type="text"
                        className={`form-input ${inputError.username ? "missing-error" : ""}`}
                        placeholder='UserName' name='username' value={userData.username}
                        onChange={handleChange}
                    />
                    {inputError.username && <p className='error-msg'>{inputError.username}</p>}

                    <input type="email"
                        className={`form-input ${inputError.email ? "missing-error" : ""}`}
                        placeholder='Email' name='email' value={userData.email}
                        onChange={handleChange}
                    />
                    {inputError.email && <p className='error-msg'>{inputError.email}</p>}

                    <input type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        className={`form-input ${inputError.mobile ? "missing-error" : ""}`}
                        placeholder='Mobile' name='mobile' value={userData.mobile}
                        onChange={handleChange}
                    />
                    {inputError.mobile && <p className='error-msg'>{inputError.mobile}</p>}

                    <div className='checkbox-container'>
                        <span>
                            <input type="checkbox" name="checkbox" id='checkbox' checked={isChecked} onChange={handleChange} /> &nbsp;
                            <p id='checkbox-text'>
                                Share my registration data with Superapp
                            </p>
                        </span>
                        {checkError && <p className='error-msg'>{checkError}</p>}
                    </div>
                    <button type="submit" id='signup-btn'>SIGN UP</button>

                    <div className='declaration'>
                        By clicking on Sign up. you agree to Superapp <span>Terms and Conditions of Use</span>
                    </div>
                    <div className="declaration">
                        To learn more about how Superapp collects, uses, shares and protects your personal data please head Superapp <span>Privacy Policy</span>
                    </div>
                </form>

            </div>
  )
}

export default SignupForm;