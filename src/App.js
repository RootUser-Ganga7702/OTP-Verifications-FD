import React, { useState } from 'react';
import './App.css'; // Import the CSS file for styling

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // For tracking step (registration or OTP)
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Register user and request OTP
  const handleRegister = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:4000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, mobile:`+91${mobile}` }),
      });

      const data = await response.json();
      setMessage(data.message);

      if (response.status === 201) {
        setStep(2); // Proceed to OTP verification step
      }
    } catch (error) {
      setMessage('Registration failed. Please try again.');
      console.log(error.message)
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:4000/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage('OTP verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container fade-in">
      <h1 className="title">Twilio OTP Verification</h1>
      
      {step === 1 && (
        <div className="form-box slide-in">
          <h2 className="form-title">Register</h2>
          <input 
            type="email" 
            placeholder="Enter email" 
            className="input-field" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <input 
            type="password" 
            placeholder="Enter password" 
            className="input-field" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <input 
            type="text" 
            placeholder="Enter mobile number" 
            className="input-field" 
            value={mobile} 
            onChange={(e) => setMobile(e.target.value)} 
          />
          <button 
            onClick={handleRegister} 
            className={`button ${loading ? 'loading' : ''}`}>
              {loading ? 'Processing...' : 'Register'}
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="form-box slide-in">
          <h2 className="form-title">Verify OTP</h2>
          <input 
            type="text" 
            placeholder="Enter OTP" 
            className="input-field" 
            value={otp} 
            onChange={(e) => setOtp(e.target.value)} 
          />
          <button 
            onClick={handleVerifyOtp} 
            className={`button ${loading ? 'loading' : ''}`}>
              {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </div>
      )}

      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default App;
