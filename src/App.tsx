import React from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Login from './components/Auth/Login/Login';
import Register from './components/Auth/Register/Register';
import { ROUTES } from './libs/models/routeModels';
import Congratulations from './components/common/Confetti/Congratulations';
import PageTransition from './libs/utils/PageTransition';

const AuthRedirect: React.FC = () => {
  return <Navigate to={ROUTES.REGISTER} />;
};

const App: React.FC = () => {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<AuthRedirect />} />
      <Route
        path={ROUTES.LOGIN}
        element={
          <PageTransition>
            <Login />
          </PageTransition>
        }
      />
      <Route
        path={ROUTES.CONGRATULATIONS}
        element={
          <PageTransition>
            <Congratulations />
          </PageTransition>
        }
      />
      <Route
        path={ROUTES.REGISTER}
        element={
          <PageTransition>
            <Register />
          </PageTransition>
        }
      />
    </Routes>
  );
};

export default App;
