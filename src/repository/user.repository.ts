import { type IUser, UserModel } from "@/models/user.model";

// Define a custom User repository
export class UserRepository {
  // Create a new user
  async createUser(userData: Partial<IUser>): Promise<IUser> {
    const user = new UserModel(userData);
    return await user.save();
  }

  // Find a user by firebaseID
  async findUserByFirebaseID(firebaseID: string): Promise<IUser | null> {
    return UserModel.findOne({ firebaseID });
  }

  // Find a user by email
  async findUserByEmail(email: string): Promise<IUser | null> {
    return UserModel.findOne({ email });
  }

  // Get all users
  async getAllUsers(): Promise<IUser[]> {
    return UserModel.find();
  }

  // Update a user
  async updateUser(firebaseID: string, updateData: Partial<IUser>): Promise<IUser | null> {
    return UserModel.findOneAndUpdate({ firebaseID }, updateData, { new: true });
  }

  // Delete a user
  async deleteUser(firebaseID: string): Promise<IUser | null> {
    return UserModel.findOneAndDelete({ firebaseID });
  }
}
