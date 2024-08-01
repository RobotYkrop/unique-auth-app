import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import Spinner from '../../common/Spinner/Spinner';
import TextField from '../../common/TextField/TextField';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../libs/models/routeModels';
import { motion, useAnimation } from 'framer-motion';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error, success } = useContext(AuthContext)!;
  const navigate = useNavigate();
  const controls = useAnimation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  useEffect(() => {
    if (!error && success) {
      const navigateAfterAnimation = async () => {
        await controls.start({ opacity: 0, transition: { duration: 0.5 } });
        navigate(ROUTES.CONGRATULATIONS);
      };

      navigateAfterAnimation();
    }
  }, [error, success, navigate, controls]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <motion.div
        initial={{ opacity: 1 }}
        animate={controls}
        className="w-full max-w-md p-8 bg-white rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <TextField
              id="email"
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <TextField
              id="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            {loading ? (
              <div className="flex justify-center items-center">
                <Spinner />
              </div>
            ) : (
              'Login'
            )}
          </button>
        </form>
        <div className="text-center mt-4">
          <button
            onClick={() => navigate(ROUTES.REGISTER)}
            className="text-blue-500 hover:text-blue-700"
          >
            Not have an account? Register
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
