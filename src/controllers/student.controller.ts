import { StudentDao } from "../dao/student.dao";
import { Logy } from "../utils/logy";
import {
  CreateStudentReq,
  createStudent,
} from "../interfaces/student/createStudent";
import Student, { IStudent } from "../models/student.model";
import { JWT } from "../utils/jwt";
import { BaseResponse } from "../interfaces/general/base.response";
import { resStatus, lang } from "../utils/enums";
import { Localize } from "../utils/localize";
import { LoginReq } from "../interfaces/student/login";
import { Payload } from '../interfaces/general/payload.interface';
import { GetStudentReq } from '../interfaces/student/getStudents';
import { MAP } from '../mapper/map';
import { StudentCourseReq } from '../interfaces/course/add-student-course';
import StudentCourse from '../models/student-course.model';
import { IStudentCourse } from '../models/student-course.model';
import { GetStudentCourseReq } from '../interfaces/course/get-student-courses';
import { MapStudentCourse } from '../mapper/map-student-course';
export class StudentController {
  constructor(private studentDao: StudentDao) {
    this.studentDao = studentDao;
  }

  logout =async (payload:Payload) => {
    try {
      const studentId = payload.id;
      
    } catch (error) {
      
    }
  }
  createNewStudent = async (createStudentReq: CreateStudentReq) => {
    try {
      const newStudent: IStudent = new Student({
        name: createStudentReq.name,
        username: createStudentReq.username,
        password: createStudentReq.password,
        email: createStudentReq.email,
        accessToken: "",
      });
      const result = await this.studentDao.createNewStudent(newStudent);
      if (!result._id) {
        const res = new BaseResponse(
          resStatus.UnprocessableEntity,
          result.message,
          result,
          ""
        );
        return res;
      } else {
        const res = new BaseResponse(
          resStatus.Successful,
          Localize.localize(createStudentReq.language, "studentCreate"),
          "",
          result
        );
        return res;
      }
    } catch (error) {
      Logy.log("error", error);
      const res = new BaseResponse(
        resStatus.UnprocessableEntity,
        Localize.localize(createStudentReq.language, "RequestError"),
        error,
        ""
      );
      return res;
    }
  };
  login = async (loginReq: LoginReq) => {
    try {
      const result = await this.studentDao.login(loginReq);
      if (!result.error) {
        const res = new BaseResponse(
          resStatus.Successful,
          Localize.localize(loginReq.language, "successfull"),
          "",
          result
        );
        return res;
      } else {
        const res = new BaseResponse(
          resStatus.NotFound,
          Localize.localize(loginReq.language,result.error),
          '',
          ""
        );
        return res;
      }
    } catch (error) {
      Logy.log("error", error);
      const res = new BaseResponse(
        resStatus.UnprocessableEntity,
        Localize.localize(loginReq.language, "RequestError"),
        error,
        ""
      );
      return res;
    }
  };
  getStudents = async (getStudentReq:GetStudentReq) => {
    try {

      const result = await this.studentDao.getAllStudents(getStudentReq);
      
      // console.log(result[0]['accessToken']);
      const res = new BaseResponse(
        resStatus.Successful,
        Localize.localize(getStudentReq.language, "successfull"),
        "",
        MAP.mapMany(result)
      );
      return res;
    } catch (error) {
      Logy.log("error", error);
      const res = new BaseResponse(
        resStatus.UnprocessableEntity,
        Localize.localize(getStudentReq.language, "RequestError"),
        error,
        ""
      );
      return res;
    }
  };
  addStudentCourse = async (student:IStudent,createStudentCourseReq: StudentCourseReq) => {
    try {
      const courseCode = createStudentCourseReq.code;

      const result = await this.studentDao.addStudentCourse(student,courseCode);
      if (!result.error) {
        const res = new BaseResponse(
          resStatus.UnprocessableEntity,
          result.message,
          result,
          ""
        );
        return res;
      } else {
        const res = new BaseResponse(
          resStatus.Successful,
          Localize.localize(createStudentCourseReq.language, "courseCreate"),
          "",
          result.error
        );
        return res;
      }
    } catch (error) {
      Logy.log("error", error);
      const res = new BaseResponse(
        resStatus.UnprocessableEntity,
        Localize.localize(createStudentCourseReq.language, "RequestError"),
        error,
        ""
      );
      return res;
    }
  };
  dropStudentCourse = async (student:IStudent,createStudentCourseReq: StudentCourseReq) => {
    try {
      const courseCode = createStudentCourseReq.code;
      console.log(courseCode);
      // console.log(student);
      const result = await this.studentDao.dropStudentCourse(student, courseCode);
      console.log(result);
      if (!result.error) {
        const res = new BaseResponse(
          resStatus.UnprocessableEntity,
          result.message,
          result,
          ""
        );
        return res;
      } else {
        const res = new BaseResponse(
          resStatus.Successful,
          Localize.localize(createStudentCourseReq.language, "courseDrop"),
          "",
          result.error
        );
        return res;
      }
    } catch (error) {
      Logy.log("error", error);
      const res = new BaseResponse(
        resStatus.UnprocessableEntity,
        Localize.localize(createStudentCourseReq.language, "RequestError"),
        error,
        ""
      );
      return res;
    }
  };
  getStudentCourse = async (student:IStudent,createStudentCourseReq: GetStudentCourseReq) => {
    try {
      const courseCode = createStudentCourseReq.code || '';
      const result = await this.studentDao.getStudentCourse(student, courseCode);
        const res = new BaseResponse(
          resStatus.Successful,
          Localize.localize(createStudentCourseReq.language, "successfull"),
          "",
          MapStudentCourse.map(result)
        );
        return res;
    } catch (error) {
      Logy.log("error", error);
      const res = new BaseResponse(
        resStatus.UnprocessableEntity,
        Localize.localize(createStudentCourseReq.language, "RequestError"),
        error,
        ""
      );
      return res;
    }
  };
}
