import Student, { IStudent } from "./../models/student.model";
import { Logy } from "../utils/logy";
import { JWT } from "../utils/jwt";
import { Hash } from "../utils/Hash";
import { Error } from "mongoose";
import { LoginReq } from "../interfaces/student/login";
import { GetStudentReq } from "../interfaces/student/getStudents";
import { IStudentCourse } from "../models/student-course.model";
import Course from "../models/course.model";
import StudentCourse from "../models/student-course.model";
import { ICourse } from '../models/course.model';
export class StudentDao {
  constructor() {}

  login = async (loginReq: LoginReq) => {
    try {
      let query: any = {};
      loginReq.username ? (query.username = loginReq.username) : null;
      loginReq.email ? (query.email = loginReq.email) : null;
      console.log(query);

      const student = await Student.findOne(query);
      console.log(student);
      if (student) {
        const isCorrect = Hash.compare(
          loginReq.password.toString(),
          student.password.toString()
        );
        if (isCorrect) {
          student.accessToken = JWT.generateToken({ id: student._id });
          return await student.save();
        }
      }
      return { error: "SudentNotFound" };
    } catch (error) {
      Logy.log("error", error);
      return error;
    }
  };
  createNewStudent = async (student: IStudent) => {
    try {
      student.accessToken = JWT.generateToken({ id: student._id });
      student.password = Hash.encrypt(student.password.toString());
      return await student.save();
    } catch (error) {
      Logy.log("error", error);
      return error;
    }
  };
  getAllStudents = async (getStudentReq: GetStudentReq) => {
    try {
      let query = {};
      getStudentReq.username
        ? (query["username"] = getStudentReq.username)
        : null;
      getStudentReq.name ? (query["name"] = getStudentReq.name) : null;
      getStudentReq.email ? (query["email"] = getStudentReq.email) : null;
      const skip = +getStudentReq.skip;
      const limit = +getStudentReq.limit;
      console.log(query);
      const students = await Student.find(query).skip(skip).limit(limit);
      return students;
    } catch (error) {
      Logy.log("error", error);
      return "";
    }
  };
  addStudentCourse = async (student: IStudent, code: String) => {
    try {
      const course = await Course.findOne({ code });
      console.log(course);
      if (!course) {
        return { error: "course does not exist" };
      }
      const newCourse: IStudentCourse = new StudentCourse({
        studentId: student,
        courseId: course,
      });
      return await newCourse.save();
    } catch (error) {
      return error;
    }
  };
  dropStudentCourse = async (student: IStudent, code: String) => {
    try {
      console.log(student._id);
      const course = await Course.findOne({ code });
      console.log(course);
      if (!course) {
        return { error: "course does not exist" };
      }
      const result = await StudentCourse.findOneAndDelete({
        studentId: student._id,
        courseId: course._id,
      });
      console.log(result);
      return result;
    } catch (error) {
      return error;
    }
  };
  getStudentCourse = async (student: IStudent, code: String) => {
    try {
      
      if (code) {
        const course = await Course.findOne({ code });
        const result = await StudentCourse.findOne({
          studentId: student._id,
          courseId: course?._id,
        });
        return result;
      } else {
        const result = await StudentCourse.find({
          studentId: student._id,
        }).populate('studentId').populate('courseId');
         return result;
      }
      
     
    } catch (error) {
      return error;
    }
  };
}
