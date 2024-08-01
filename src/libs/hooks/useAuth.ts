import { useState, useEffect } from 'react';
import { mockFetch } from '../../api/api';
import { API_ENDPOINTS } from '../models/apiModels';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [step, setStep] = useState(1);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await mockFetch(API_ENDPOINTS.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      console.log(result)
      if (response.ok) {
        setIsAuthenticated(true);
        setSuccess(result.success);
      } else {
        setError(result.error);
      }
    } finally {
      setLoading(false);
    }
  };

  const register = async (
    email: string,
    password: string,
    confirmPassword: string,
  ) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await mockFetch(API_ENDPOINTS.REGISTER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess(result.success);
        setStep(2);
      } else {
        setError(result.error);
      }
    } finally {
      setLoading(false);
    }
  };

  const verify = async (email: string, verificationCode: string) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await mockFetch(API_ENDPOINTS.VERIFY, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, verificationCode }),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess(result.success);
        setIsAuthenticated(true);
      } else {
        setError(result.error);
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  const resetApiState = () => {
    setError(null);
    setSuccess(null);
  };

  return {
    isAuthenticated,
    loading,
    error,
    success,
    step,
    login,
    register,
    verify,
    logout,
    resetApiState,
  };
};
