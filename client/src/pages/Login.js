import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Link, useNavigate } from "react-router-dom"
import * as yup from 'yup';
import axios from 'axios';

function Login({ setUserDetails }) {

    // Login Stuff here
    const initialValues = {
        username: '',
        password: ''
    };

    const navigate = useNavigate();
    const loginSubmit = (data) => {
        axios.post('http://localhost:3001/users/login', data).then((response) => {
            if (response.data.error) {
                alert(response.data.error);
            } else {
                localStorage.setItem('accessToken', response.data.accessToken);
                setUserDetails({
                    isLoggedIn: true,
                    username: response.data.user.username,
                    id: response.data.user.id,
                    email: response.data.user.email,
                    phoneNo: response.data.user.phoneNo
                })
                navigate('/');
            }
        });
    }

    const validationSchema = yup.object().shape({
        username: yup.string().required('Username is required'),
        password: yup.string().min(8).max(20).required('Password is required')
    });
    // Login Stuff finishes here

    return (
        <div className='login-container'>
            <h1 id='login-heading'>Login</h1>
            <Formik
                initialValues={initialValues}
                onSubmit={loginSubmit}
                validationSchema={validationSchema}>
                <Form className='form-group'>
                    <label htmlFor="username">Username : </label>
                    <Field
                        name="username"
                        type="text"
                        className="login-username"
                        placeholder="Username..." />
                    <ErrorMessage name="username" component="div" className="error-message" />
                    <br /><br />
                    <label htmlFor="password">Password : </label>
                    <Field
                        name="password"
                        type="password"
                        className="login-password"
                        placeholder="Password..." />
                    <ErrorMessage name="password" component="div" className="error-message" />
                    <br /><br />
                    <button type="submit" className="login-button">Login</button>
                </Form>
            </Formik>
            <div>
                <Link id='register-link' to="/register">New User... <br />Click Here to Register</Link>
            </div>
        </div >
    )
}

export default Login