import { Schema, model } from "mongoose";

export interface IMaterial extends Document {
  name?: string;
  nameEN?: string;
  nameES?: string;
  suggestedFrequency?: number;
}

const materialSchema = new Schema<IMaterial>({
  name: { type: String, required: false },
  nameEN: { type: String, required: false },
  nameES: { type: String, required: false },
  suggestedFrequency: { type: Number, required: false },
});

export const Material = model("Material", materialSchema);
