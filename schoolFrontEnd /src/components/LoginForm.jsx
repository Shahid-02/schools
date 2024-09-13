import React, { useState } from 'react';
import axios from 'axios';
import backgroundImage from './360_F_331450336_4R8J1DHNH2xwYrJ8u6wxXcHMnFN8QdgL.jpg';
import schoolLogo from './beaconhouse-school-system-logo-B8DD760BF0-seeklogo.com.png';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    if (!email || !password) {
      setError('Email and password are required');
      setIsLoading(false);
      return;
    }
   
    try {
      const response = await axios.post('http://localhost:3000/admin/login', {
        email,
        password,
      });

        //  const token = response.data.data.token

      if (response.data && response.data.data.admin && response.data.data.admin.email === email) {
        // localStorage.setItem('token', token);
        setIsLoading(false);
        navigate('/dashboard');
      } else {
        setError('User not registered or incorrect credentials');
        setIsLoading(false);
      }
    } catch (error) {
      setError(error.response ? error.response.data.message : 'Login failed');
      console.error('Login Error:', error.response ? error.response.data : error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div
        className="relative flex flex-col items-center justify-center w-1/2 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
        }}
      >
        <div className="absolute inset-0 bg-red-600 opacity-50"></div>
        <img src={schoolLogo} alt="School Logo" className="w-32 h-auto mb-4 z-10" />
        <h1 className="text-white text-4xl font-bold z-10">WELCOME</h1>
      </div>
      <div className="relative flex flex-col items-center bg-blue-900 justify-center w-1/2 ">
        <div className="absolute top-0 left-0 w-full h-full bg-blue-900 transform origin-left -skew-x-12"></div>
        <form
          onSubmit={handleLoginSubmit}
          className="relative z-10 bg-white p-8 rounded-lg shadow-lg"
          style={{ width: '80%', maxWidth: '400px' }}
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-4 mb-4 border rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full p-4 mb-4 border rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <a href="/forgot-password" className="text-blue-900 hover:underline mb-4 inline-block">
            Forgot your password?
          </a>

          <button
            type="submit"
            className="bg-red-600 text-white p-4 w-full rounded-lg hover:bg-red-700"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'SIGN IN'}
          </button>
          {error && <p className="text-red-600 mt-4">{error}</p>}
        </form>
        <h1 className="relative z-10 text-gray-400 mt-8">@ 2021 Firm Foundation School Management</h1>
      </div>
    </div>
  );
};

export default LoginForm;
