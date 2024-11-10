import { Schema, model } from "mongoose";

export interface IMaterial extends Document {
  name: string;
  description?: string;
}

const materialSchema = new Schema<IMaterial>({
  name: { type: String, required: true },
  description: { type: String, required: false },
});

export const Material = model("Material", materialSchema);
