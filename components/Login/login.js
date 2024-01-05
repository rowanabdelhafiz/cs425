import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './login.css';
import {server} from '../Signup/server2'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    // Add your login logic here, such as sending a request to the server
    // For demonstration purposes, always show an error message
    setShowErrorMessage(true);

    // For demonstration purposes, logging the entered credentials
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Login</button>

        {showErrorMessage && (
          <p style={{ color: 'red' }}>This email does not exist. Please create an account first.</p>
        )}

<p className="signup-link">
  Don't have an account? <Link to="/signup">Signup here</Link>
</p>
      </form>
    </div>
  );
};

export default Login;
