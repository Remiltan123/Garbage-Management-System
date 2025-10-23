import express from "express";
import * as garbageReportController from "../controllers/garbageReportController.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

// Public routes
router.post(
  "/reports",
  upload.single("garbageImage"),
  garbageReportController.createGarbageReport
);

// Protected routes (add authentication middleware as needed)
router.get("/reports", garbageReportController.getAllGarbageReports);
router.get("/reports/statistics", garbageReportController.getReportStatistics);
router.get("/reports/:id", garbageReportController.getGarbageReportById);
router.put(
  "/reports/:id/status",
  garbageReportController.updateGarbageReportStatus
);
router.put("/reports/:id/assign", garbageReportController.assignCollector);
router.delete("/reports/:id", garbageReportController.deleteGarbageReport);
router.get(
  "/reports/collector/:collectorId",
  garbageReportController.getReportsByCollector
);

router.get("/reports-assigned/:collecter_id", garbageReportController.getAssignGarbageForCollector)

export default router;
