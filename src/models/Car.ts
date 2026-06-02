import mongoose, { Schema, type Model } from "mongoose";
import {
  CAR_TYPES,
  FUEL_TYPES,
  TRANSMISSIONS,
  type ICar,
} from "@/types/car.types";

const carSchema = new Schema<ICar>(
  {
    make: { type: String, required: true, trim: true, index: true },
    modelName: { type: String, required: true, trim: true, index: true },
    year: { type: Number, required: true, min: 1900, index: true },
    transmission: { type: String, required: true, enum: TRANSMISSIONS },
    fuelType: { type: String, required: true, enum: FUEL_TYPES },
    seats: { type: Number, required: true, min: 1, max: 12 },
    doors: { type: Number, required: true, min: 2, max: 6 },
    pricePerDay: { type: Number, required: true, min: 0, index: true },
    description: { type: String, default: "" },
    features: { type: [String], default: [] },
    location: { type: String, required: true, index: true },
    isAvailable: { type: Boolean, default: true, index: true },
    averageRating: { type: Number, default: 0, min: 0, max: 5 },
    totalReviews: { type: Number, default: 0, min: 0 },
    mileage: { type: Number, required: true, min: 0 },
    color: { type: String, required: true },
    licensePlate: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    carType: { type: String, required: true, enum: CAR_TYPES, index: true },
  },
  { timestamps: true, versionKey: false },
);

carSchema.index({ make: "text", modelName: "text" });

const Car: Model<ICar> = (mongoose.models.Car as Model<ICar>) || mongoose.model<ICar>("Car", carSchema);

export default Car;