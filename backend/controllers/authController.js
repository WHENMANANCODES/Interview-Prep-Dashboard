const User = require("../Models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register a new user logic

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 2. Hash the password securely using bcryptjs
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 3. Create and save the new user in MongoDB
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword
    });

    //Generate JWT token for authentication (optional, can be used for login)
    const token = jwt.sign(
      {
        userId : newUser._id
      },
      process.env.JWT_SECRET,
      {
        expiresIn : "1d"
      }
    );

    // 5. Send token and user details back to frontend
    res.status(201).json({ 
      message: "User registered successfully", 
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error during registration", error: error.message });
  }
};

module.exports = {
  register
};