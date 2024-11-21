import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeatherForCity } from '../../store/slices/weatherSlice';
import WeatherCard from '../WeatherCard/WeatherCard';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { logout } from '../../store/slices/userSlice';
import Loader from '../Loader/Loader';
import RefreshButton from '../RefreshButton/RefreshButton';
import classes from './WeatherDisplay.module.css';

const WeatherDisplay = React.memo(() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { weatherData, loading, error } = useSelector((state) => state.weather);
  const userCity = useSelector(state => state.user.userData?.user.city);
  const isAdmin = useSelector(state => state.user.userData?.user.isadmin);
  
  useEffect(() => {
    if (userCity) {
      dispatch(fetchWeatherForCity(userCity));
    }
  }, [dispatch, userCity]);

  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/login');
  };

  if (loading) return <Loader/>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <div className={classes.wrapper}>     
        <div className={classes.buttons}> 
          <Button variant="contained" color="secondary" onClick={handleLogout}>
            Выйти
          </Button>
          <RefreshButton city={userCity}></RefreshButton>
          {isAdmin && (
            <Button
              variant="contained" 
              color="primary"
              onClick={() => navigate('/admin')}
            >
              Админская кнопка
            </Button>)}
          </div >
          <div className={classes.card}>
             {weatherData && <WeatherCard cityName={userCity} weather={weatherData} />}
          </div>
          
    </div>
);
});

export default WeatherDisplay;
