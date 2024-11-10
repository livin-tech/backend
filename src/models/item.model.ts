import { Schema, type Types, model } from "mongoose";

export interface IItem extends Document {
  name: string;
  materials: Types.ObjectId[];
}

const itemSchema = new Schema<IItem>({
  name: { type: String, required: true },
  materials: [{ type: Schema.Types.ObjectId, ref: "Material" }],
});

export const ItemModel = model("Item", itemSchema);
