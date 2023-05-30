const express = require("express");
const route = express.Router();
const { addUser,loginUser,updateUser } = require('../controllers/userController');
// const authenticateToken = require('../middlewares/auth');



route.post('/api/signup', addUser);
route.post('/api/login', loginUser);
route.put('/api/users/:userId', updateUser);





module.exports = route;