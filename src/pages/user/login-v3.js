import React, { useEffect, useContext, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { AppSettings } from './../../config/app-settings.js';
import CryptoJS from 'crypto-js';  
import axios from 'axios' 
import Swal from 'sweetalert2';  
import myImage from './LegalDiaryLogo.png';

function LoginV3() {
  const context = useContext(AppSettings);
  const [redirect, setRedirect] = useState(false);
  const [userNameOrEmailAddress, setUserNameOrEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    context.handleSetAppSidebarNone(true);
    context.handleSetAppHeaderNone(true);
    context.handleSetAppContentClass('p-0');

    return () => {
      context.handleSetAppSidebarNone(false);
      context.handleSetAppHeaderNone(false);
      context.handleSetAppContentClass('');
    };
  }, [context]);

  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   const requestBody = {
  //     userNameOrEmailAddress,
  //     password,
  //   };

  //   try {
  //     const response = await axios.post('https://localhost:44311/api/TokenAuth/Authenticate', requestBody, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });

  //     if (response.status === 200) {
  //       const data = response.data;
  //       if (data && data.result && data.result.accessToken) {
  //         const secretKey = 'your-secret-key';  
  //         const encryptedToken = CryptoJS.AES.encrypt(data.result.accessToken, secretKey).toString();
  //         localStorage.setItem('authToken', encryptedToken);
  //         setRedirect(true);
  //       } else {
  //         throw new Error('No access token found in the response.');
  //       }
  //     } else {
  //       throw new Error(`Unexpected response status: ${response.status}`);
  //     }
  //   } catch (error) {
  //     let errorMessage = '';
      
  //     if (error.response) {   
  //       errorMessage = `Server responded with status ${error.response.status}: ${error.response.data}`;
  //     } else if (error.request) {  
  //       errorMessage = 'No response received from server.';
  //     } else {
  //       errorMessage = `Error setting up request: ${error.message}`;
  //     }
      
     
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Login Failed',
  //       text: errorMessage,
  //     });

  //     console.error('Error:', error.message);
  //   }
  // };

const handleSubmit = async (event) => {
  event.preventDefault();

  const requestBody = {
    userNameOrEmailAddress,
    password,
    rememberClient: rememberMe 
  };

  try {
    const response = await axios.post('https://localhost:44311/api/TokenAuth/Authenticate', requestBody, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      const data = response.data;
      if (data && data.result && data.result.accessToken) {
        const secretKey = 'your-secret-key';  
        const encryptedToken = CryptoJS.AES.encrypt(data.result.accessToken, secretKey).toString();
        localStorage.setItem('authToken', encryptedToken);
        setRedirect(true);
      } else {
        throw new Error('No access token found in the response.');
      }
    } else {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    let errorMessage = 'An error occurred';
    let errorDetails = '';

    if (error.response && error.response.data && error.response.data.error) {
     
      errorMessage = error.response.data.error.message || 'Login failed!';
      errorDetails = error.response.data.error.details || 'No further details available.';
    } else if (error.request) {
      errorMessage = 'No response received from server.';
      errorDetails = 'The request was made, but no response was received.';
    } else {
      errorMessage = `Error setting up request: ${error.message}`;
      errorDetails = error.stack;
    }

  
    Swal.fire({
      icon: 'error',
      title: errorMessage, // Main error message
      text: errorDetails,  // Displaying the error details like "Invalid user name or password"
      footer: 'Please check your credentials and try again.', // Footer message for extra guidance
    });

    console.error('Error:', error.message);
  }
};

  

  if (redirect) {
    return <Navigate to='/dashboard/v3' />;
  }

  return (
    <div className="login login-with-news-feed">
      <div className="news-feed">
        <div className="news-image" style={{ backgroundImage: `url(${myImage})`, objectFit: 'contain' }}></div>
        <div className="news-caption">
        </div>
      </div>
      <div className="login-container">
        <div className="login-header mb-30px">
          <div className="brand">
            <div className="d-flex align-items-center">
              <span className="logo"></span>
              <b>Legal </b> Diaries
            </div>
          </div>
        </div>
        <div className="login-content">
          <form onSubmit={handleSubmit} className="fs-13px">
            <div className="form-floating mb-15px">
              <input
                type="text"
                className="form-control h-45px fs-13px"
                placeholder="Username or Email Address"
                id="userNameOrEmailAddress"
                value={userNameOrEmailAddress}
                onChange={(e) => setUserNameOrEmailAddress(e.target.value)}
              />
              <label htmlFor="userNameOrEmailAddress" className="d-flex align-items-center fs-13px text-gray-600">
                Username or Email Address
              </label>
            </div>
            <div className="form-floating mb-15px">
              <input
                type="password"
                className="form-control h-45px fs-13px"
                placeholder="Password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="password" className="d-flex align-items-center fs-13px text-gray-600">
                Password
              </label>
            </div>
            <div className="form-check mb-30px">
    <input
      className="form-check-input"
      type="checkbox"
      value={rememberMe}
      id="rememberMe"
      onChange={(e) => setRememberMe(e.target.checked)}  
    />
    <label className="form-check-label" htmlFor="rememberMe">
      Remember Me
    </label>
  </div>
            <div className="mb-15px">
              <button type="submit" className="btn btn-theme d-block h-45px w-100 btn-lg fs-14px">
                Sign me in
              </button>
            </div>
            <div className="mb-40px pb-40px text-body">
              Not a member yet? Click <Link to="/user/register-v3" className="text-primary">here</Link> to register.
            </div>
            <hr className="bg-gray-600 opacity-2" />
            <div className="text-gray-600 text-center text-gray-500-darker mb-0">
              &copy; Color Admin All Right Reserved 2024
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginV3;
