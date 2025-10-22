import mongoose from "mongoose";

const CollectorAssignmentSchema = new mongoose.Schema(
  {
    collector: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collector",
      required: true,
    },
    report: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GarbageReport",
      required: true,
    },
    distance: { type: Number }, 
    duration: { type: Number }, 
    status: {
      type: String,
      enum: ["assigned", "in-progress", "completed"],
      default: "assigned",
    },
    assignedAt: { type: Date, default: Date.now },
  },
  { collection: "collector_assignments" }
);

export default mongoose.model("CollectorAssignment", CollectorAssignmentSchema);