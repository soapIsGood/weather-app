import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';  
import axios from 'axios';  

const initialState = {
  weatherData: null,
  loading: false,
  error: null, 
};

const apiKey = '67ef221f76716d876c6cd5c2c514676b';

export const fetchWeatherForCity = createAsyncThunk(
  'weather/fetchWeatherForCity',
  async (city) => {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    return response.data;
  }
);

const weatherSlice = createSlice({
  name: 'weather',  
  initialState,  
  reducers: {},  
  extraReducers: (builder) => {  
    builder
      .addCase(fetchWeatherForCity.pending, (state) => {  
        state.loading = true;  
        state.error = null;  
      })
      .addCase(fetchWeatherForCity.fulfilled, (state, action) => {  
        state.loading = false;  
        state.weatherData = action.payload;  // Сохраняем данные о погоде для выбранного города
      })
      .addCase(fetchWeatherForCity.rejected, (state, action) => { 
        state.loading = false;  
        state.error = action.error.message;  
      });
  },
});

export default weatherSlice.reducer;
