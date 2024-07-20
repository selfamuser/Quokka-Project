import bcrypt from "bcrypt";
import Article from "../models/articleModel.js";
import User from "../models/userModel.js";
import generateToken from "../utils/jwtTokenGenerator.js";

const registerUser = async (req, res) => {
  console.log("Inside the register user method");

  const { name, email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email: email });
    if (checkUser) {
      return res.status(400).json({
        message: "User already exists with this email",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const token = generateToken(user._id);
    res.status(201).json({
      message: "User created successfully",
      user: user,
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      message: "User registration failed",
      error: error,
    });
  }
};

const loginUser = async (req, res) => {
  console.log("Inside the login user method");

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({
        message: "No user exists with mentioned email. Register as new user",
      });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(401).json({
        message: "Password is incorrect",
      });
    }

    const token = generateToken(user._id);
    res.status(200).json({
      message: "User logged in successfully",
      user: user,
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      message: "User login failed",
      error: error,
    });
  }
};

const getProfile = async (req, res) => {
  console.log("Inside get profile method");

  try {
    console.log("Request user:", req.user);

    const user = await User.findById(req.user._id);
    console.log("Found user:", user);

    const articles = await Article.find({ author: req.user._id });

    console.log("Articles by user:", articles);

    res.json({
      user: user,
      message: "Articles uploaded by user",
      articles: articles,
    });
  } catch (error) {
    res.status(500).json({
      message: "User profile not found",
      error: error,
    });
  }
};

export { getProfile, loginUser, registerUser };
