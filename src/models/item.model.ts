import { Schema, type Types, model } from "mongoose";

export interface IItem extends Document {
  name: string;
  category: "CLEANING" | "MAINTENANCE";
  subCategory?: string;
  image: string;
  materials: Types.ObjectId[];
}

const itemSchema = new Schema<IItem>({
  name: { type: String, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: false },
  image: { type: String, required: true },
  materials: [{ type: Schema.Types.ObjectId, ref: "Material" }],
});

export const ItemModel = model("Item", itemSchema);
