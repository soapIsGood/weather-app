const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Подключение к базе данных
const User = require('./user-model.js'); // Импорт модели пользователя

const Token = sequelize.define('Token', {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User, // Ссылка на модель User
      key: 'id'
    },
    allowNull: false
  },
  refreshToken: {
    type: DataTypes.STRING,
    allowNull: false
  }
},
{
  tableName: 'tokens', // Указываем, что таблица называется 'users'
  timestamps: false   // Отключаем временные метки
});

// Установка связи с моделью User
User.hasMany(Token, { foreignKey: 'userId' });
Token.belongsTo(User, { foreignKey: 'userId' });

module.exports = Token;