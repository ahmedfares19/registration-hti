import { Document, Model, model, Schema, Error } from "mongoose";
import { isEmail } from "validator";
import { Localize } from "../utils/localize";
import { ICourse } from "./course.model";
export interface IStudent extends Document {
  name: String;
  username: String;
  password: String;
  accessToken: String;
  email: String;
}
export const StudentSchema: Schema = new Schema<IStudent>(
  {
    name: { type: String },
    email: {
      type: String,
      trim: true,
      unique: true,
      validate: [isEmail, "invalid email"],
    },
    username: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true },
    accessToken: { type: String },
  },
  {
    collection: "student",
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);
const Student: Model<IStudent> = model<IStudent>("Student", StudentSchema);
export default Student;
