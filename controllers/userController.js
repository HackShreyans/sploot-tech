const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { isEmailValid } = require('../utils/email-check');

const mongoose = require('mongoose');

exports.addUser = async (req, res) => {
  try {
    const { email, password, name, age } = req.body;

    if (!email || !password || !name || !age) {
      return res.status(400).json({ "Error": "Please fill all data" });
    }

    const isValid = isEmailValid(email)

    if (!isValid) {
      return res.status(400).json({ "Error": "Invalid email format" });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = new userModel({
      email,
      password: passwordHash,
      name,
      age,
    });

    const token = jwt.sign({ email }, process.env.secret_key, { expiresIn: '1h' });

    const savedUser = await user.save();

    res.status(201).json({ "Successful": "User created successfully", token, "userData": savedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ "Error": "Internal Server Error" });
  }
};


exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ "Error": "Please provide email and password" });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ "Error": "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ "Error": "Invalid email or password" });
    }

    const token = jwt.sign({ email }, process.env.secret_key, { expiresIn: '1h' });

    res.status(200).json({ "Success": "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ "Error": "Internal Server Error" });
  }
};





exports.updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
   
    const { name, age } = req.body;

    // Check if userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid user ID.' });
    }

    // Update the user record
    const updatedUser = await userModel.findByIdAndUpdate(userId, { name, age }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.status(200).json({ user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
