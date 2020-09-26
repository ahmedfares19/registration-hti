import { Document, Model, model, Schema, Error } from 'mongoose';
import { isEmail } from 'validator';
import { Localize } from '../utils/localize';
import { profTypes } from '../utils/enums';
import { IProf } from './prof.model';
export interface ICourse extends Document  {
  name: String;
  code: String;
  fullMark: Number;
  prof:IProf
}
export const CourseSchema: Schema = new Schema<ICourse>(
  {
    name: { type: String, },
    code: { type: String, trim: true ,unique: true},
    fullMark: { type: Number, required: true },
    prof: { type: Schema.Types.ObjectId, ref: "Prof" },
  },
  {
    collection: 'course',
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  }
);
const Course: Model<ICourse> = model<ICourse>('Course', CourseSchema);
export default Course;