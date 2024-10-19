import { ItemModel } from "../models/item.model";
import { type IMaterial, Material } from "../models/material.model";

export class MaterialRepository {
  // Create a new material
  async createMaterial(materialData: Partial<IMaterial>): Promise<IMaterial> {
    const material = new Material(materialData);
    return await material.save();
  }

  // Find a material by ID
  async findMaterialById(materialId: string): Promise<IMaterial | null> {
    return Material.findById(materialId).populate("item");
  }

  // Get all materials
  async getAllMaterials(): Promise<IMaterial[]> {
    return Material.find().populate("item");
  }

  // Update a material
  async updateMaterial(materialId: string, updateData: Partial<IMaterial>): Promise<IMaterial | null> {
    return Material.findByIdAndUpdate(materialId, updateData, { new: true }).populate("item");
  }

  // Delete a material
  async deleteMaterial(materialId: string): Promise<IMaterial | null> {
    return Material.findByIdAndDelete(materialId);
  }
}
