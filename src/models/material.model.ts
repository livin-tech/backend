import { Schema, Types, model } from "mongoose";

export interface IMaterial {
  name: string;
  item: Types.ObjectId;
  priority: number;
  frequency: string;
  description?: string;
}

const materialSchema = new Schema({
  name: { type: String, required: true },
  item: { type: Types.ObjectId, ref: "Item", required: true },
  priority: { type: Number, required: true },
  frequency: { type: String, required: true },
  description: String,
});

export const Material = model("Material", materialSchema);
