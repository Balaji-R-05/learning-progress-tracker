import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import sendEmail from '../utils/sendEmail.js'; // now imports a function

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

// Register user
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: "Missing details" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists!" });
    }

    const user = new User({ name, email, password });
    await user.save();

    const subject = "Welcome to CodeX";
    const text = `Welcome to CodeX.\nYour account has been created with the email ID: ${email}`;

    try {
      await sendEmail(
        email,
        subject,
        text
      );
    } catch (err) {
      console.error("Email sending failed:", err.message);
    }

    return res.status(201).json({
      success: true,
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user),
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// Login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Missing details" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    res.status(200).json({
      success: true,
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user),
      logged_in: true
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
