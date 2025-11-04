import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Collector from "../models/Collector.js";


export const register = async (req, res) => {

  try {
    const { username, email, password, contactnumber, role } = req.body;

    if (!username || !email || !password || !contactnumber || !role) {
      return res.status(400).json({
        success: false,
        message: "Please provide necessary details",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      contactNumber: contactnumber,
      role: role.toLowerCase(),
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, username: newUser.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        user: {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          contactNumber: newUser.contactnumber,
          role: newUser.role,
        },
        token,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({
      success: false,
      message: "Error registering user",
      error: error.message,
    });
  }
};



export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    let user = await User.findOne({ email });
    let collector = null;

    if (!user) {
      collector = await Collector.findOne({ email });
    }

    if (!user && !collector) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials ",
      });
    }


    const account = user || collector;
    const role = user ?  user.role : collector.role;


    const isPasswordValid = await bcrypt.compare(password, account.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials - wrong password",
      });
    }


    const token = jwt.sign(
      { id: account._id, role, email: account.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );


    res.status(200).json({
      success: true,
      message: `${role === "collector" ? "Collector" : "User"} login successful`,
      data: {
        user: {
          id: account._id,
          username: account.username || account.name,
          email: account.email,
          role,
        },
        token,
      },
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Error logging in",
      error: error.message,
    });
  }
};



export const registerCollector = async (req, res) => {
  try {
    const { name, email, phone, start, end, area, assignedBins, routePolyline, role, password } = req.body;

    console.log("detiolas ===>", name, email, phone, start, end, area, assignedBins, routePolyline, role, password)

    if (!name || !email || !start || !end || !assignedBins || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const existingCollector = await Collector.findOne({ email });
    if (existingCollector) {
      return res.status(400).json({ error: "Collector with this email already exists" });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newCollector = new Collector({
      name,
      email,
      password: hashedPassword,
      phone,
      start,
      end,
      area,
      assignedBins,
      routePolyline,
      role: role || "collector",
    });

    await newCollector.save();

    res.status(201).json({
      message: "Collector registered successfully",
      collector: newCollector,
    });
  } catch (error) {
    console.error("Error registering collector:", error);
    res.status(500).json({ error: "Server error" });
  }
};


