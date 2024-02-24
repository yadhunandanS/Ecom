const express = require('express');
const userRouter = express.Router();
const { getUsers, saveUser, loginUser, updateUser, updateUserById } = require('../controller/user-controller');
const { userAuthMiddleware, adminAuthMiddleware } = require('../middlewares/user-auth-middleware');

userRouter.get('', adminAuthMiddleware, getUsers);
userRouter.post('', adminAuthMiddleware, saveUser);
userRouter.put('', userAuthMiddleware, updateUser);

userRouter.put('/:user_id', adminAuthMiddleware, updateUserById)
userRouter.post('/login', loginUser);

module.exports = { userRouter };