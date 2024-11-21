const jwt = require('jsonwebtoken');
const tokenModel = require('../models/token-model.js');

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '15m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})

        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return userData;
        } catch (error) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return userData;
        } catch (error) {
            return null;            
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await tokenModel.findOne({ where: { userId: userId } }) // Может быть просто userId тест
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        const token = await tokenModel.create({userId: userId, refreshToken: refreshToken});
        return token
    } 

    async removeToken(refreshToken) {
        const tokenData = await tokenModel.destroy({where: {refreshToken: refreshToken}});
        return tokenData;
    }

    async findToken(refreshToken) {
        const tokenData = await tokenModel.findOne({where: {refreshToken: refreshToken}});
        return tokenData;
    }
}

module.exports = new TokenService();