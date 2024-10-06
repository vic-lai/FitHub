const { Router } = require('express');
const authController = require('../controllers/authControllers');
const { checkUser } = require('../middleware/authMiddleware')

const router = Router();

router.post('/signup', authController.signup_post);
router.post('/login', authController.login_post);
router.post('/logout', authController.logout_post);
router.get('/getUser', authController.user_get);

module.exports = router;
