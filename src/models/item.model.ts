import { Schema, type Types, model } from "mongoose";

interface IName {
  en: string;
  es: string;
}

export interface IItem extends Document {
  _id?: Types.ObjectId;
  name: IName;
  category: "CLEANING" | "MAINTENANCE";
  categoryEn?: "Cleaning" | "Maintenance";
  categoryEs?: "Limpieza" | "Mantenimiento";
  subCategory?: string;
  subCategoryEn?: string;
  subCategoryEs?: string;
  image: string;
  materials: Types.ObjectId[];
  order?: number;
}

const itemSchema = new Schema<IItem>({
  _id: { type: Schema.Types.ObjectId, required: false },
  name: {
    en: { type: String, required: true },
    es: { type: String, required: true },
  },
  category: { type: String, required: true },
  categoryEn: { type: String, required: false },
  categoryEs: { type: String, required: false },
  subCategory: { type: String, required: false },
  subCategoryEn: { type: String, required: false },
  subCategoryEs: { type: String, required: false },
  image: { type: String, required: true },
  materials: [{ type: Schema.Types.ObjectId, ref: "Material" }],
  order: { type: Number, required: false },
});

export const ItemModel = model("Item", itemSchema);
