import React, { useState } from 'react';
import './LoginCSS.css'; 

function Login({ setActivePage }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if ( username != null && password != null) {
      alert("Login successful!");
      setActivePage("Welcome");
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="Login">
      <h2>Login</h2>
      <div>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </label>
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;