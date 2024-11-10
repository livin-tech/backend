import { Material } from "../models/material.model"; // Assuming you have a Material model file

export class MaterialRepository {
  // Create a new material
  async createMaterial(data: { name: string; description?: string }) {
    return await Material.create(data);
  }

  // Get all materials
  async getAllMaterials() {
    return await Material.find();
  }

  // Get a material by its ID
  async getMaterialById(id: string) {
    return await Material.findById(id);
  }

  // Update a material by its ID
  async updateMaterial(id: string, data: { name?: string; description?: string }) {
    return await Material.findByIdAndUpdate(id, data, { new: true });
  }

  // Delete a material by its ID
  async deleteMaterial(id: string) {
    return await Material.findByIdAndDelete(id);
  }
}
