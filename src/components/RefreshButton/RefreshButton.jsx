import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeatherForCity } from '../../store/slices/weatherSlice';
import { Button, CircularProgress } from '@mui/material';

const RefreshButton = ({city}) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.weather.loading);

  const handleRefresh = () => {
    if (city) {
      dispatch(fetchWeatherForCity(city));
    }
  };

  return (
    <Button 
      variant="contained" 
      color="primary" 
      onClick={handleRefresh} 
      disabled={loading}
    >
      {loading ? <CircularProgress size={24} color="inherit" /> : 'Обновить погоду'}
    </Button>
  );
};

export default RefreshButton;
