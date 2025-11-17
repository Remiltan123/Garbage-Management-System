import express from "express";
import { register, login } from "../controllers/authController.js";
import { registerCollector } from "../controllers/authController.js";
import {getUser} from '../controllers/getUser.js'

const router = express.Router();

// Register route
router.post("/register", register);

// Login route
router.post("/login", login);

router.post("/collecter-register", registerCollector);

router.get('/getuser/:user_id', getUser);

export default router;
