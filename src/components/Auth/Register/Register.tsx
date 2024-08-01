import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../common/Spinner/Spinner';
import Success from '../../common/StatusApi/Success';
import TextField from '../../common/TextField/TextField';
import { ROUTES } from '../../../libs/models/routeModels';
import './Register.css';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const { resetApiState, register, verify, loading, error, success, step } =
    useContext(AuthContext)!;
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      await register(email, password, confirmPassword);
    } else if (step === 2) {
      await verify(email, verificationCode);
      if (!error && success) {
        setShowSuccess(true);
      }
    }
  };

  useEffect(() => {
    if (!error && showSuccess && step === 2) {
      setTimeout(() => {
        navigate(ROUTES.LOGIN);
      }, 3000);
    }
  }, [showSuccess, step, navigate]);

  useEffect(() => {
    resetApiState
  }, [])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div
        className={`w-full max-w-md p-8 bg-white rounded-lg shadow-lg transition-transform transform ${step === 2 ? 'animate-fade-in' : ''}`}
      >
        {(!error && showSuccess) ? (
          <Success />
        ) : (
          <>
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">
              {step === 1 ? 'Register' : 'Verify Your Email'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {step === 1 ? (
                <>
                  <TextField
                    id="email"
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                    value={email.trim()}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <TextField
                    id="password"
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <TextField
                    id="confirm-password"
                    label="Confirm Password"
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </>
              ) : (
                <div className="relative">
                  <TextField
                    id="verification-code"
                    label="Verification Code"
                    type="text"
                    placeholder="Enter the code sent to your email"
                    value={verificationCode.trim()}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    required
                  />
                  <p className="text-sm text-gray-600 mt-2">
                    Enter the verification code <strong>123456</strong> sent to your email.
                  </p>
                </div>
              )}
              {error && (
                <div className="text-red-500 text-sm border border-red-500 p-2 rounded">
                  {error}
                </div>
              )}
              <button
                type="submit"
                className="relative w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {loading ? (
                  <div className="flex justify-center items-center">
                    <Spinner />
                  </div>
                ) : step === 1 ? (
                  'Register'
                ) : (
                  'Verify'
                )}
              </button>
            </form>
            <div className="text-center mt-4">
              <button
                onClick={() => navigate(ROUTES.LOGIN)}
                className="text-blue-500 hover:text-blue-700"
              >
                Already have an account? Login
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Register;
