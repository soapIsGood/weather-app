const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('weather-app', 'postgres', 'ssimss11', {
  host: 'localhost',   //хост базы данных
  dialect: 'postgres', //используею PostgreSQL
  logging: false // выключаю логирование запросов в консоль
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Подключение к базе данных установлено успешно.');
  } catch (error) {
    console.error('Ошибка подключения к базе данных:', error);
  }
})();

module.exports = sequelize;