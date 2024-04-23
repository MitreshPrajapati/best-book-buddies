const { Router } = require('express');
const { registerUser, loginUser } = require('../controllers/userController');

const userRouter = Router();

userRouter.post('/register', registerUser);

userRouter.post('/login', loginUser);

// userRouter.post('/logout', (req, res) => {});



module.exports = { userRouter };