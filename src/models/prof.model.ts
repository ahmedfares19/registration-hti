import { Document, Model, model, Schema, Error } from 'mongoose';
import { isEmail } from 'validator';
import { Localize } from '../utils/localize';
import { profTypes } from '../utils/enums';
import { ICourse } from './course.model';
export interface IProf extends Document  {
  name: String;
  username: String;
  password: String;
  accessToken: String;
  email: String;
  courses?: ICourse[]
  type:profTypes
}
export const ProfSchema: Schema = new Schema<IProf>(
  {
    name: { type: String, },
    email: { type: String, trim: true ,unique: true,validate:[isEmail,'invalid email']},
    username: { type: String,required: true, trim: true ,unique: true,},
    password: { type: String ,required: true,},
    accessToken: { type: String },
    type: { type: profTypes },
    courses:[{ type: Schema.Types.ObjectId, ref: "Course" }]
  },
  {
    collection: 'prof',
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  }
);
const Prof: Model<IProf> = model<IProf>('Prof', ProfSchema);
export default Prof;