const UserModel = require('../models/user-model.js');
const bcrypt = require('bcrypt');
const tokenService = require('./token-service.js'); 
const UserDto = require('../dtos/user-dto.js');
const ApiError = require('../exceptions/api-error.js');

class UserService {
    async registration(email, password, city, isAdmin) {
      // Проверяем, существует ли пользователь с данным email
      const candidate = await UserModel.findOne({ where: { email } });
      if (candidate) {
        throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`);
      }
  
      // Создаем нового пользователя
      const hashPassword = await bcrypt.hash(password, 3)
      const user = await UserModel.create({ email, password: hashPassword, city, isAdmin});

      const userDto = new UserDto(user); 
      const tokens = tokenService.generateTokens({...userDto});
      await tokenService.saveToken(userDto.id, tokens.refreshToken);

      return {
        ...tokens,
        user: userDto
      }
    }

    async login(email, password) {
      const user = await UserModel.findOne({ where: { email }});
      if (!user) {
        throw ApiError.BadRequest('Пользователь с таким email не найден');
      }
      const isPassword = await bcrypt.compare(password, user.password);
      if (!isPassword) {
        throw ApiError.BadRequest('Неверный пароль');
      }
      const userDto = new UserDto(user);
      const tokens = tokenService.generateTokens({...userDto});

      await tokenService.saveToken(userDto.id, tokens.refreshToken);

      return {
        ...tokens,
        user: userDto
      }
    }

    async logout(refreshToken) {
      const token = await tokenService.removeToken(refreshToken);
      return token;
    }

    async refresh(refreshToken) {
      if (!refreshToken) {
        throw ApiError.UnauthorizedError();
      }
      const userData = tokenService.validateRefreshToken(refreshToken);
      const tokenFromDB = await tokenService.findToken(refreshToken);
      if (!userData || !tokenFromDB) {
        throw ApiError.UnauthorizedError();
      }
      const user = await UserModel.findByPk(userData.id) //Мб здесь userId
      const userDto = new UserDto(user);
      const tokens = tokenService.generateTokens({...userDto});

      await tokenService.saveToken(userDto.id, tokens.refreshToken);

      return {
        ...tokens,
        user: userDto
      }
    }

    async getAllUsers() {
      const users = await UserModel.findAll();
      return users;
    }
  }

module.exports = new UserService();