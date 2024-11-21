const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Подключение к базе данных

const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isadmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  
},
{
  tableName: 'users', // Указываем, что таблица называется 'users'
  timestamps: false   // Отключаем временные метки
});

module.exports = User;