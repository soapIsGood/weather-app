import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { login } from '../../store/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginError = useSelector((state) => state.user.isError)
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Пожалуйста, заполните все поля');
      return;
    }

    try {
      await dispatch(login({email, password}))
    } catch (err) {
      console.error(err);
      setError('Ошибка при входе');
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  },[isAuthenticated, navigate])

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Вход
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Почта"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Пароль"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <Typography color="error">{error}</Typography>}
          {loginError && <Typography color="error">{loginError}</Typography>}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Войти
          </Button>
        </form>
        <Typography align="center" sx={{ mt: 2 }}>
          Нет аккаунта? <Link to="/registration">Зарегистрироваться</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default LoginForm;
