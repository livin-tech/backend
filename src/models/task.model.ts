import mongoose, { type Document, type Schema } from "mongoose";

export enum TaskType {
  Cleaning = "Cleaning",
  Maintenance = "Maintenance",
}

export interface ITask extends Document {
  title: string;
  description: string;
  dueDate: Date;
  type: TaskType;
  property: string; // Property ID
}

const taskSchema: Schema<ITask> = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  type: {
    type: String,
    enum: [TaskType.Cleaning, TaskType.Maintenance],
    required: true,
  },
  property: {
    type: String,
    required: true,
  },
});

export const TaskModel = mongoose.model<ITask>("Task", taskSchema);
