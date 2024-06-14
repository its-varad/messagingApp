import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import signinImage from '../assets/hospitalSignUp.png';

const initialState = {
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    avatarURL: ''
};

const cookies = new Cookies();

export const Auth = () => {
    const [form, setForm] = useState(initialState);
    const [isSignUp, setIsSignUp] = useState(true);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { fullName, username, password, phoneNumber, avatarURL } = form;
        const URL = 'http://localhost:4000/auth';

        try {
            const response = await fetch(`${URL}/${isSignUp ? "signup" : "login"}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fullName,
                    username,
                    password,
                    phoneNumber,
                    avatarURL
                })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            const { token, userId, hashedPassword } = data;

            cookies.set('token', token, { path: '/' });
            cookies.set('username', username, { path: '/' });
            cookies.set('fullName', fullName, { path: '/' });
            cookies.set('userId', userId, { path: '/' });

            if (isSignUp) {
                cookies.set('hashedPassword', hashedPassword, { path: '/' });
                cookies.set('avatarURL', avatarURL, { path: '/' });
                cookies.set('phoneNumber', phoneNumber, { path: '/' });
            }

            window.location.reload();
        } catch (error) {
            console.error('Error in handleSubmit:', error);
        }
    };

    const switchMode = () => {
        setIsSignUp((prev) => !prev);
    };

    return (
        <div className='auth__form-container'>
            <div className='auth__form-container_fields'>
                <div className='auth__form-container_fields-content'>
                    <p>{isSignUp ? 'Sign Up' : 'Sign In'}</p>
                    <form onSubmit={handleSubmit}>
                        {isSignUp && (
                            <div className='auth__form-container_fields-content_input'>
                                <label htmlFor='fullName'>Full Name</label>
                                <input
                                    name='fullName'
                                    type='text'
                                    placeholder='Full Name'
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        <div className='auth__form-container_fields-content_input'>
                            <label htmlFor='username'>Username</label>
                            <input
                                name='username'
                                type='text'
                                placeholder='Username'
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {isSignUp && (
                            <>
                                <div className='auth__form-container_fields-content_input'>
                                    <label htmlFor='phoneNumber'>Phone Number</label>
                                    <input
                                        name='phoneNumber'
                                        type='number'
                                        placeholder='Phone Number'
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className='auth__form-container_fields-content_input'>
                                    <label htmlFor='avatarURL'>Avatar URL</label>
                                    <input
                                        name='avatarURL'
                                        type='text'
                                        placeholder='Avatar URL'
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </>
                        )}
                        <div className='auth__form-container_fields-content_input'>
                            <div className='auth__form-container_fields-content_input_password'>
                            <label htmlFor='password'>Password</label>
                            <input
                                name='password'
                                type='password'
                                placeholder='Password'
                                onChange={handleChange}
                                required
                            />
                            </div>
                            
                        </div>
                        {isSignUp && (
                            <div className='auth__form-container_fields-content_input'>
                                <div className='auth__form-container_fields-content_input_password'>
                                <label htmlFor='confirmPassword'>Confirm Password</label>
                                <input
                                    name='confirmPassword'
                                    type='password'
                                    placeholder='Confirm Password'
                                    onChange={handleChange}
                                    required
                                />
                                </div>
                                
                            </div>
                        )}
                        <div className='auth__form-container_fields-content_button'>
                            <button>{isSignUp ? 'Sign Up' : 'Sign In'}</button>
                        </div>
                    </form>
                    <div className='auth__form-container_fields-account'>
                        <p>
                            {isSignUp
                                ? 'Already have an account?'
                                : "Don't have an account?"}
                            <span onClick={switchMode}>
                                {isSignUp ? ' Sign In' : ' Sign Up'}
                            </span>
                        </p>
                    </div>
                </div>
                
            </div>
            <div className='auth__form-container_image'>
                <img src={signinImage} alt='sign in' width='20' />
                <p className='usChat'>UsChat</p>
            </div>
        </div>
    );
};
