import { type IProperty, PropertyModel } from "../models/property.model";

export class PropertyRepository {
  // Create a new property
  async createProperty(propertyData): Promise<IProperty> {
    const property = new PropertyModel(propertyData);
    return await property.save();
  }

  // Find a property by ID
  async findPropertyById(propertyId: string): Promise<IProperty | null> {
    return PropertyModel.findById(propertyId).populate("owner");
  }

  // Get all properties
  async getAllProperties() {
    const properties = await PropertyModel.aggregate([
      {
        // Look up reminders for each property
        $lookup: {
          from: "reminders", // The name of the Reminder collection in MongoDB
          localField: "_id",
          foreignField: "property",
          as: "reminders",
        },
      },
      {
        // Add a field 'reminderCount' that stores the count of reminders for each property
        $addFields: {
          reminderCount: { $size: "$reminders" },
        },
      },
      {
        // Optionally, exclude the full 'reminders' array if not needed in the result
        $project: {
          reminders: 0,
        },
      },
    ]);
    return PropertyModel.populate(properties, { path: "owner" });
  }

  // Update a property
  async updateProperty(propertyId: string, updateData): Promise<IProperty | null> {
    return PropertyModel.findByIdAndUpdate(propertyId, updateData, { new: true }).populate("owner");
  }

  // Delete a property
  async deleteProperty(propertyId: string): Promise<IProperty | null> {
    return PropertyModel.findByIdAndDelete(propertyId);
  }
}
