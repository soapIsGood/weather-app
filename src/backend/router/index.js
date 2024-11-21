const Router = require('express').Router;
const userController = require('../controllers/user-controller.js')
const {body} = require('express-validator');
const authMiddleware = require('../middleware/auth-middleware.js');

const router = new Router();

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 4, max: 14}),
    userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/refresh', userController.refresh);
router.get('/users', authMiddleware,  userController.getUsers );

module.exports = router;
