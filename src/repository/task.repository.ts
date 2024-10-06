import { type ITask, TaskModel } from "../models/task.model";

export class TaskRepository {
  // Create a new task
  async createTask(taskData: Partial<ITask>): Promise<ITask> {
    const task = new TaskModel(taskData);
    return await task.save();
  }

  // Find a task by ID
  async findTaskById(taskId: string): Promise<ITask | null> {
    return TaskModel.findById(taskId).populate("property");
  }

  // Get all tasks for a property
  async getTasksByProperty(propertyId: string): Promise<ITask[]> {
    return TaskModel.find({ property: propertyId }).populate("property");
  }

  // Update a task
  async updateTask(taskId: string, updateData: Partial<ITask>): Promise<ITask | null> {
    return TaskModel.findByIdAndUpdate(taskId, updateData, { new: true }).populate("property");
  }

  // Delete a task
  async deleteTask(taskId: string): Promise<ITask | null> {
    return TaskModel.findByIdAndDelete(taskId);
  }
}
