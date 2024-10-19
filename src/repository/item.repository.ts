import { CATEGORY, type IItem, ItemModel } from "../models/item.model";
import { Material } from "../models/material.model";

export class ItemRepository {
  // Create a new item
  async createItem(itemData: Partial<IItem>): Promise<IItem> {
    const item = new ItemModel(itemData);
    return await item.save();
  }

  // Find an item by ID
  async findItemById(itemId: string): Promise<IItem | null> {
    return ItemModel.findById(itemId).populate("materials");
  }

  // Get all items
  async getAllItems(): Promise<IItem[]> {
    return ItemModel.find().populate("materials");
  }

  async getAllItemsByCategory(category: string): Promise<IItem[]> {
    return ItemModel.find({ category: category }).populate("materials");
  }

  // Update an item
  async updateItem(itemId: string, updateData: Partial<IItem>): Promise<IItem | null> {
    return ItemModel.findByIdAndUpdate(itemId, updateData, { new: true }).populate("materials");
  }

  // Delete an item
  async deleteItem(itemId: string): Promise<IItem | null> {
    // Remove associated materials before deleting the item
    await Material.deleteMany({ item: itemId });
    return ItemModel.findByIdAndDelete(itemId);
  }
}
