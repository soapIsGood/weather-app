import React from 'react';
import { WbSunny, Cloud, AcUnit } from '@mui/icons-material'

const WeatherIcon = ({ weather }) => {
  switch (weather) {
    case 'Clear':
      return <WbSunny fontSize="large" color="primary" />;
    case 'Clouds':
      return <Cloud fontSize="large" color="action" />;
    case 'Snow':
      return <AcUnit fontSize="large" color="info" />;
    default:
      return <WbSunny fontSize="large" color="disabled" />;
  }
};

export default WeatherIcon;
