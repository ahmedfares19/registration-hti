import { Document, Model, model, Schema, Error } from 'mongoose';
import { IStudent } from './student.model';
import { ICourse } from './course.model';
export interface IStudentCourse extends Document  {
  studentId: IStudent;
  courseId: ICourse;
  gpa: Number;
}
export const StudentCourseSchema: Schema = new Schema<IStudentCourse>(
  {
    studentId: { type: Schema.Types.ObjectId, ref: "Student" },
    courseId: { type: Schema.Types.ObjectId, ref: "Course" },
    gpa: { type: Number},
  },
  {
    collection: 'student-course',
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  }
);
const StudentCourse: Model<IStudentCourse> = model<IStudentCourse>('StudentCourse', StudentCourseSchema);
export default StudentCourse;