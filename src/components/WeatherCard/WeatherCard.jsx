import React from 'react';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';
import WeatherIcon from '../WeatherIcon/WeatherIcon'

const WeatherCard = ({ cityName, weather }) => {
  const {icon} = weather.weather[0]
  
  return (
    <Card sx={{ maxWidth: 300, margin: '0 auto', boxShadow: 3 }}>
      <CardMedia
        component="img"
        height="140"
        image={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={`Иконка погоды для ${cityName}`}
        sx={{ objectFit: 'contain', marginTop: 2 }}
      />
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, textAlign: 'center'}}>
        <Typography variant="h5" component="div" gutterBottom>
          {cityName}
        </Typography>
        <Typography variant="h4" color="text.secondary">
          Температура: {weather.main.temp}°C
        </Typography>
        <div>
          <Typography variant="body2" color="text.secondary">
          Погодные условия: {weather.weather[0].description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          Скорость ветра: {weather.wind.speed} м/с
          </Typography>
        </div>
        <WeatherIcon weather={weather.weather[0].main} />
      </CardContent>
    </Card>
  );
};

export default WeatherCard;

