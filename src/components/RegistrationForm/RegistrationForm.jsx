import React, {useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { TextField, Button, Container, Typography, Box, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { registration } from '../../store/slices/userSlice';

const RegistrationForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isError = useSelector(state => state.user.isError)

  const cities = ['Москва', 'Санкт-Петербург', 'Казань', 'Новосибирск'];
  
  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 4 && password.length <= 14;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !selectedCity) {
      setError('Пожалуйста, заполните все поля');
      return;
    }

    if (!validateEmail(email)) {
      setError('Введите корректный email');
      return;
    }

    if (!validatePassword(password)) {
      setError('Пароль должен содержать от 4 до 14 символов');
      return;
    }

    try {
      const resultRegistration = await dispatch(registration({email, password, city: selectedCity}));
  
      if (resultRegistration.payload && !resultRegistration.error) {
        navigate('/login');
        setEmail('');
        setPassword('');
        setSelectedCity('');
      }
    } catch (error) {
      console.log(error);
    } 
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Регистрация
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
           {/* {errors.email && <span>{errors.email}</span>} */}
          <TextField
            label="Пароль"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Выберите город</InputLabel>
            <Select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              {cities.map((city) => (
                <MenuItem key={city} value={city}>
                  {city}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {error && <Typography color="error">{error}</Typography>}
          {isError && <Typography color="error">{isError}</Typography>}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Зарегистрироваться
          </Button>
        </form>
        <Typography align="center" sx={{ mt: 2 }}>
          Уже есть аккаунт? <Link to="/login">Войти</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default RegistrationForm;
