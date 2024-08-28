/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './login.css'
import axios from 'axios'

function LogIn() {

  const [validated, setValidated] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    const email = form.formBasicEmail.value;
    const password = form.formBasicPassword.value;

    try {
      const response = await axios.post('http://localhost:5050/user/login', { email, password });
      if (response.status === 200) {
        const userId = response.data.userId;
        const accessToken = response.headers['authorization'];
        sessionStorage.setItem('token', `${accessToken}`); // Salva accessToken nel sessionStorage
        sessionStorage.setItem('userId', `${userId}`);  // Salva l'ID utente nel sessionStorage
        window.location.href = '/home';
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className="sfondo">
      <div className="login">
        <h1 className='titolo'>Log in</h1>
        <div className="form">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail" >
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
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className='quicksand-normal'>
              Password
              </Form.Label>
              <Form.Control required type="password" placeholder="Password" />
              <Form.Control.Feedback type="invalid">
              Please choose a valid password.
              </Form.Control.Feedback>
            </Form.Group>
            <div className='div-login-button'>
            <Button type="submit" className='login-button temp'> Log In
            </Button>
            <Link className="register-link quicksand-light" to="/register" style={{cursor:"pointer"}}>
            I don't have an account!
            </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default LogIn