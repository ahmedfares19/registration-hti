import { Document, Model, model, Schema, Error } from 'mongoose';
import { isEmail } from 'validator';
import { Localize } from '../utils/localize';
import { profTypes } from '../utils/enums';
export interface ICourse extends Document  {
  name: String;
  code: String;
  fullMark: Number;
}
export const CourseSchema: Schema = new Schema<ICourse>(
  {
    name: { type: String, },
    code: { type: String, trim: true ,unique: true},
    fullMark: { type: Number,required:true },
  },
  {
    collection: 'course',
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  }
);
const Course: Model<ICourse> = model<ICourse>('Course', CourseSchema);
export default Course;