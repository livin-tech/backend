import { Schema, Types, model } from "mongoose";

export interface IItem {
  name: string;
  category: string;
  materials: Types.ObjectId[];
}

export enum CATEGORY {
  CLEANING = "CLEANING",
  MAINTENANCE = "MAINTENANCE",
}

const itemSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, enum: CATEGORY, required: true },
  materials: [{ type: Types.ObjectId, ref: "Material" }],
});

export const ItemModel = model("Item", itemSchema);
