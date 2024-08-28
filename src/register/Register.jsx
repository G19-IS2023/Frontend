/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import './register.css';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [validated, setValidated] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
            return;
        }
        
        function generateObjectId() {
            const timestamp = Math.floor(Date.now() / 1000); // seconds since epoch
            const machineId = Math.floor(Math.random() * 0xFFFFFF); // 3-byte machine identifier
            const processId = Math.floor(Math.random() * 0xFFFF); // 2-byte process identifier
            const counter = Math.floor(Math.random() * 0xFFFFFF); // 3-byte counter
          
            const objectId = `${timestamp.toString(16).padStart(8, '0')}${machineId.toString(16).padStart(6, '0')}${processId.toString(16).padStart(4, '0')}${counter.toString(16).padStart(6, '0')}`;
          
            return objectId;
          }

        const userId = generateObjectId(); // Generazione del User ID

        const userData = {
            userId: userId,
            name: name,
            email: email,
            password: password
        };

        try {
            const response = await axios.post(`https://backend-production-7b98.up.railway.app/user/register`, userData);
            if (response.status === 201) {
                alert('Registration successful! You can now log in.');
                window.location.href = './'; // Assicurarsi che il percorso sia corretto
            } else {
                throw new Error('Registration failed');
            }
        } catch (error) {
            console.error('Registration error:', error);
            alert('Registration failed. Please check the details and try again.');
        }
    };

    return (
        <div className="sfondo">
            <div className="login">
                <h1 className="titolo">Register</h1>
                <div className="form">
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicUsername" onChange={(e) => setName(e.target.value)}>
                            <Form.Label className="quicksand-normal">
                                Username
                            </Form.Label>
                            <Form.Control required type="text" placeholder="Enter username" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail" onChange={(e) => setEmail(e.target.value)}>
                            <Form.Label className="quicksand-normal">
                                Email address
                            </Form.Label>
                            <Form.Control required type="email" placeholder="Enter email" />
                            <Form.Control.Feedback type="invalid">
                                Please choose a valid email.
                            </Form.Control.Feedback>
                            <Form.Text className="quicksand-light">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword" onChange={(e) => setPassword(e.target.value)}>
                            <Form.Label className="quicksand-normal">Password</Form.Label>
                            <Form.Control required type="password" placeholder="Password" />
                            <Form.Control.Feedback type="invalid">
                                Please choose a valid password.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <div className="div-login-button">
                            <Button type="submit" className="login-button">
                                Sign in
                            </Button>
                            <Link
                                className="register-link quicksand-light"
                                to="/"
                                style={{ cursor: "pointer" }}
                            >
                                I already have an account!
                            </Link>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default Register;
