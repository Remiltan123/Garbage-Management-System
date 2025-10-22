import mongoose from "mongoose";

const LocationSchema = new mongoose.Schema({
  lat: { type: Number, required: true },
  lon: { type: Number, required: true },
});

const CollectorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },           
    email: { type: String, required: true, unique: true }, 
    password: {type: String, required: true,},
    phone: { type: String },                          
    start: { type: LocationSchema, required: true },  
    end: { type: LocationSchema, required: true },    
    area: { type: String },                          
    assignedBins: { type: String , required: true},
    routePolyline: { type: String },                  
    createdAt: { type: Date, default: Date.now },
    role: {
      type: String,  
      default: "reporter",
      lowercase: true,
      trim: true,
    }
  },
  { collection: "collectors" }
);

export default mongoose.model("Collector", CollectorSchema);