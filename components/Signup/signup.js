import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Navbar from '../Navbar/Nabar';
import { server } from './server2';
import './signup.css';

const Signup = () => {
  const [first_name, setfirst_name] = useState('');
  const [last_name, setlast_name] = useState('');
  const [user_name, setuser_name] = useState('');
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      // Check if the email already exists
      const existingUser = await axios.get(`${server}user`);

      if (existingUser.data.length > 0) {
        toast.error('This email is already registered. Please login instead.');
        return;
      }

      // If the email is not already registered, proceed with signup
      await axios.post(`${server}user`, {
        first_name,
        last_name,
        user_name,
        email,
        password,
      });

      // Show success message
      toast.success('Signup successful! Logging you in...');

      // Automatically log in the user after successful signup
      const loginResponse = await axios.post(`${server}user`, {
        email,
        password,
      });

      // Store the token or user information in your authentication state
      localStorage.setItem('token', loginResponse.data.token);

      // Reset the form
      setfirst_name('');
      setlast_name('');
      setuser_name('');
      setemail('');
      setPassword('');

      // Redirect to the dashboard or any other page after successful login
      window.location.href = '/dashboard'; // Replace '/dashboard' with the desired route
    } catch (error) {
      console.error('Error signing up:', error);
      toast.error('Signup failed. Please try again.');
    }
  };

  

  return (
    <div>
      <Navbar />
      <h4>Signup</h4>
      <Form onSubmit={handleSignup}>
        <Form.Group controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your first name"
            value={first_name}
            onChange={(e) => setfirst_name(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="fromLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your last name"
            value={last_name}
            onChange={(e) => setlast_name(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formemail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formpssowrd">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Signup
        </Button>
      </Form>
      <p className="login-link">
        Already have an account? <Link to="/login">Login here</Link>
      </p>
      <ToastContainer />
    </div>
  );
};

export default Signup;
