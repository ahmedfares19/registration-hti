import { Logy } from "../utils/logy";
import { JWT } from "../utils/jwt";
import { Hash } from "../utils/Hash";
import { Error } from "mongoose";
import { LoginReq } from "../interfaces/student/login";
import { LoginProfReq } from "../interfaces/prof/login";
import { GetStudentReq } from "../interfaces/student/getStudents";
import { ICourse } from "../models/course.model";
import Course from "../models/course.model";
import {
  GivePermissionReq,
  givePermissionProf,
} from "../interfaces/prof/give-permision";
import { profTypes } from "../utils/enums";
import { PutGpaProfReq } from "../interfaces/prof/put-gpa";
import Student from "../models/student.model";
import StudentCourse from "../models/student-course.model";
import Prof, { IProf } from "../models/prof.model";
import { GetProfStudentReq } from '../interfaces/prof/get-student';
import { ProfStudent } from '../mapper/teacher.mapper';
export class ProfDao {
  constructor() {}

  login = async (loginReq: LoginProfReq) => {
    try {
      let query: any = {};
      loginReq.username ? (query.username = loginReq.username) : null;
      loginReq.email ? (query.email = loginReq.email) : null;
      console.log(query);

      const prof = await Prof.findOne(query);
      console.log(prof);
      if (prof) {
        const isCorrect = Hash.compare(
          loginReq.password.toString(),
          prof.password.toString()
        );
        if (isCorrect) {
          prof.accessToken = JWT.generateToken({ id: prof._id });
          return await prof.save();
        }
      }
      return { error: "SudentNotFound" };
    } catch (error) {
      Logy.log("error", error);
      return error;
    }
  };
  createNewProf = async (prof: IProf) => {
    try {
      prof.accessToken = JWT.generateToken({ id: prof._id });
      prof.password = Hash.encrypt(prof.password.toString());
      return await prof.save();
    } catch (error) {
      Logy.log("error", error);
      return error;
    }
  };
  getAllStudents = async (getProfRequest: GetStudentReq) => {
    try {
      let query = {};
      getProfRequest.username
        ? (query["username"] = getProfRequest.username)
        : null;
      getProfRequest.name ? (query["name"] = getProfRequest.name) : null;
      getProfRequest.email ? (query["email"] = getProfRequest.email) : null;
      const skip = +getProfRequest.skip;
      const limit = +getProfRequest.limit;
      console.log(query);
      const students = await Prof.find(query).skip(skip).limit(limit);
      return students;
    } catch (error) {
      Logy.log("error", error);
      return "";
    }
  };
  createNewCourse = async (course: ICourse) => {
    try {
      const result = await course.save();
      if (!result) throw new Error("");
      return course;
    } catch (error) {
      return error;
    }
  };
  givePermission = async (givePermissionReq: GivePermissionReq) => {
    try {
      const result = await Prof.findOne({
        username: givePermissionReq.username,
      });
      if (result) {
        result.type = givePermissionReq.type;
        await result.save();
      } else {
      }
    } catch (error) {}
  };
  putGpa = async (putGpaProfReq: PutGpaProfReq) => {
    try {
      const student = await Student.findOne({
        username: putGpaProfReq.username,
      });
      if (!student)
        throw new Error("no studet");
      const course = await Course.findOne({ code: putGpaProfReq.courseCode });
      if (!course)
        throw new Error("no course");
      if (+course.fullMark < +putGpaProfReq.mark)
        throw new Error("mark is greater than course fullMark");
      const res = await StudentCourse.findOne({
        studentId: student._id,
        courseId: course._id,
      });
      if (!res) throw new Error("no student course");
      else res.gpa = +putGpaProfReq.mark;
      return await res.save();
    } catch (error) {
      return { error:error.message };
    }
  };
}
