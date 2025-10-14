import express from "express";
import {
  changeRole,
  getAllCollectors,
} from "../controllers/adminController.js";

const router = express.Router();

router.post("/changeRole", changeRole);
router.get("/collectors", getAllCollectors);

export default router;
