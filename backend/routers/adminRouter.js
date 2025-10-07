import express from "express";
import { changeRole } from "../controllers/adminController.js";

const router = express.Router();

router.post("/changeRole", changeRole);

export default router;
