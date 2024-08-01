import React, { useEffect, useContext } from 'react';
import Confetti from 'react-confetti';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { motion, useAnimation } from 'framer-motion';
import './Congratulations.css';

const Congratulations: React.FC = () => {
  const { resetApiState } = useContext(AuthContext)!;
  const navigate = useNavigate();
  const controls = useAnimation();

  useEffect(() => {
    const navigateAfterAnimation = () => {
      setTimeout(async () => {
        await controls.start({ opacity: 0, transition: { duration: 1 } });
        navigate('/login');
      }, 3000);
    };

    resetApiState();
    navigateAfterAnimation();
  }, [navigate, resetApiState, controls]);

  return (
    <div className="congratulations-container">
      <Confetti />
      <motion.div
        initial={{ opacity: 1 }}
        animate={controls}
        className="congratulations-content"
      >
        <div className="congratulations-content">
          <h1 className="congratulations-title">Congratulations!</h1>
          <p className="congratulations-message">
            You ve successfully logged in. Redirecting you to the login page
            shortly...
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Congratulations;
