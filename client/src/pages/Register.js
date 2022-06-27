import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

function Register() {

    // Register Stuff here
    const initialValues = {
        username: '',
        password: '',
        phoneNo: '',
        email: '',
    };

    const navigate = useNavigate();

    const registerSubmit = (data) => {
        data.phoneNo = parseInt(data.phoneNo);
        axios.post('http://localhost:3001/users/register', data).then((response) => {
            console.log(response);
            navigate('/login');
        });
    }

    const validationSchema = yup.object().shape({
        username: yup.string().required('Username is required'),
        password: yup.string().min(8).max(20).required('Password is required'),
        phoneNo: yup.string().min(10).max(10).required('Phone number is required'),
        email: yup.string().email().required('Email is required'),
    });
    // Register Stuff finishes here

    return (
        <div className='register-container'>
            <h1 id='register-heading'>Register</h1>
            <Formik
                initialValues={initialValues}
                onSubmit={registerSubmit}
                validationSchema={validationSchema}>
                <Form className='form-group'>
                    <label htmlFor="username">Username : </label>
                    <Field
                        name="username"
                        type="text"
                        className="register-username"
                        placeholder="Username..." />
                    <ErrorMessage name="username" component="div" className="error-message" />
                    <br /><br />
                    <label htmlFor="password">Password : </label>
                    <Field
                        name="password"
                        type="password"
                        className="register-password"
                        placeholder="Password..." />
                    <ErrorMessage name="password" component="div" className="error-message" />
                    <br /><br />
                    <label htmlFor="phoneNo">Phone No. : </label>
                    <Field
                        name="phoneNo"
                        type="text"
                        className="register-phoneNo"
                        placeholder="Phone No. ..." />
                    <ErrorMessage name="phoneNo" component="div" className="error-message" />
                    <br /><br />
                    <label htmlFor="email">Email ID : </label>
                    <Field
                        name="email"
                        type="text"
                        className="register-email"
                        placeholder="Email ID..." />
                    <ErrorMessage name="email" component="div" className="error-message" />
                    <br /><br />
                    <button type="submit" className="register-button">Register</button>
                </Form>
            </Formik>
        </div>
    )
}

export default Register