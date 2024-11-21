import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm/LoginForm';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import WeatherDisplay from './components/WeatherDisplay/WeatherDisplay';
import AdminPage from './components/AdminPage/AdminPage';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkAuth } from './store/slices/userSlice';
import ProtectedRoute from './components/ProtectedRoutes/ProtectedRoutes';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuth());
    }
  },[dispatch])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/registration" element={<RegistrationForm />} />
        <Route path="/dashboard" element={<ProtectedRoute><WeatherDisplay /></ProtectedRoute>}/>
        <Route path="/admin" element={<ProtectedRoute isAdminRoute={true}><AdminPage/></ProtectedRoute>}/>
      </Routes>
    </Router>
  );
};

export default App;

