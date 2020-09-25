import { Logy } from "../utils/logy";
import { JWT } from "../utils/jwt";
import { Hash } from "../utils/Hash";
import { Error } from "mongoose";
import { LoginReq } from "../interfaces/student/login";
import { LoginProfReq } from "../interfaces/prof/login";
import { GetStudentReq } from "../interfaces/student/getStudents";
import { ICourse } from "../models/course.model";
import Prof, { IProf } from "../models/prof.model";
import Course from "../models/course.model";
import { GetCourseReq } from '../interfaces/course/get-courses';
export class CourseDao {
  constructor() {}

  createNewCourse = async (course: ICourse) => {
    try {
      return await course.save();
    } catch (error) {
      Logy.log("error", error);
      return error;
    }
  };
  getAllCourses = async (getCourseReq: GetCourseReq) => {
    try {
      let query = {};
      getCourseReq.name? query["name"] = getCourseReq.name: null;
      getCourseReq.code ? (query["code"] = getCourseReq.code) : null;
      const skip = +getCourseReq.skip;
      const limit = +getCourseReq.limit;
      console.log(query);
      const courses = await Course.find(query).skip(skip).limit(limit);
      return courses;
    } catch (error) {
      Logy.log("error", error);
      return "";
    }
  };
  dropCourse = async (courseCode: String) => {
    try {
      const res = await Course.deleteOne({ code: courseCode });
      return res;
    } catch (error) {
      return error;
    }
  };
}
