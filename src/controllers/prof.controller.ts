import { StudentDao } from "../dao/student.dao";
import { Logy } from "../utils/logy";
import {
  CreateStudentReq,
  createStudent,
} from "../interfaces/student/createStudent";
import Student, { IStudent } from "../models/student.model";
import { JWT } from "../utils/jwt";
import { BaseResponse } from "../interfaces/general/base.response";
import { resStatus, lang, profTypes } from "../utils/enums";
import { Localize } from "../utils/localize";
import { ProfDao } from "../dao/prof.dao";
import { IProf } from "../models/prof.model";
import Prof from "../models/prof.model";
import { CreateProfReq } from "../interfaces/prof/create.prof";
import { LoginProfReq } from "../interfaces/prof/login";
import { GetStudentReq } from "../interfaces/student/getStudents";
import { MAP } from "../mapper/map";
import {
  CreateCourseReq,
  createCourse,
} from "../interfaces/course/create-course";
import { ICourse } from "../models/course.model";
import Course from "../models/course.model";
import { CourseDao } from "../dao/course.dao";
import { DropCourseReq } from "../interfaces/course/drop-course";
import { GetCourseReq } from "../interfaces/course/get-courses";
import { GivePermissionReq } from "../interfaces/prof/give-permision";
import { PutGpaProfReq } from "../interfaces/prof/put-gpa";
import { GetProfStudentReq } from '../interfaces/prof/get-student';
import { MapTeacherStudents } from '../mapper/teacher.mapper';
export class ProfController {
  constructor(private profDao: ProfDao, private courseDao: CourseDao) {
    this.profDao = profDao;
    this.courseDao = courseDao;
  }

  createNewProf = async (createProfReq: CreateProfReq) => {
    try {
      const newProf: IProf = new Prof({
        name: createProfReq.name,
        username: createProfReq.username,
        password: createProfReq.password,
        email: createProfReq.email,
        type: createProfReq.type,
        accessToken: "",
      });
      const result = await this.profDao.createNewProf(newProf);
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
          Localize.localize(createProfReq.language, "profCreate"),
          "",
          result
        );
        return res;
      }
    } catch (error) {
      Logy.log("error", error);
      const res = new BaseResponse(
        resStatus.UnprocessableEntity,
        Localize.localize(createProfReq.language, "RequestError"),
        error,
        ""
      );
      return res;
    }
  };
  login = async (loginReq: LoginProfReq) => {
    try {
      const result = await this.profDao.login(loginReq);
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
          Localize.localize(loginReq.language, 'Unauthorized'),
          "",
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
  getProfs = async (getProfRequest: GetStudentReq) => {
    try {
      Logy.log("debug", "from Dao");
      const result = await this.profDao.getAllStudents(getProfRequest);
      Logy.log("debug", "result");
      const res = new BaseResponse(
        resStatus.Successful,
        Localize.localize(getProfRequest.language, "successfull"),
        "",
        MAP.mapMany(result)
      );
      return res;
    } catch (error) {
      Logy.log("error", error);
      const res = new BaseResponse(
        resStatus.UnprocessableEntity,
        Localize.localize(getProfRequest.language, "RequestError"),
        error,
        ""
      );
      return res;
    }
  };
  createNewCourse = async (createCourseReq: CreateCourseReq) => {
    try {
      let newCourse: ICourse = new Course({
        name: createCourseReq.name,
        code: createCourseReq.code,
        fullMark: createCourseReq.fullmark,
        accessToken: "",
      });
      const result = await this.courseDao.createNewCourse(newCourse);
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
          Localize.localize(createCourseReq.language, "courseCreate"),
          "",
          result
        );
        return res;
      }
    } catch (error) {
      Logy.log("error", error);
      const res = new BaseResponse(
        resStatus.UnprocessableEntity,
        Localize.localize(createCourseReq.language, "RequestError"),
        error,
        ""
      );
      return res;
    }
  };

  dropCourse = async (dropCourseReq: DropCourseReq) => {
    try {
      const courseCode = dropCourseReq.code;
      const result = await this.courseDao.dropCourse(courseCode);
      const res = new BaseResponse(
        resStatus.Successful,
        Localize.localize(dropCourseReq.language, "courseDrop"),
        "",
        result
      );
      return res;
    } catch (error) {
      Logy.log("error", error);
      const res = new BaseResponse(
        resStatus.UnprocessableEntity,
        Localize.localize(dropCourseReq.language, "RequestError"),
        error,
        ""
      );
      return res;
    }
  };
  getCourse = async (getCourseReq: GetCourseReq) => {
    try {
      const result = await this.courseDao.getAllCourses(getCourseReq);
      const res = new BaseResponse(
        resStatus.Successful,
        Localize.localize(getCourseReq.language, "successfull"),
        "",
        result
      );
      return res;
    } catch (error) {
      Logy.log("error", error);
      const res = new BaseResponse(
        resStatus.UnprocessableEntity,
        Localize.localize(getCourseReq.language, "RequestError"),
        error,
        ""
      );
      return res;
    }
  };
  givePermission = async (givePermissionReq: GivePermissionReq) => {
    try {
      const result = await this.profDao.givePermission(givePermissionReq);
      const res = new BaseResponse(
        resStatus.Successful,
        Localize.localize(givePermissionReq.language, "studentCreate"),
        "",
        result
      );
      return res;
    } catch (error) {
      Logy.log("error", error);
      const res = new BaseResponse(
        resStatus.UnprocessableEntity,
        Localize.localize(givePermissionReq.language, "RequestError"),
        error,
        ""
      );
      return res;
    }
  };
  putGpa = async (putGpaProfReq: PutGpaProfReq) => {
    try {
      const result = await this.profDao.putGpa(putGpaProfReq);
      if (result["error"]) {
        const res = new BaseResponse(
          resStatus.UnprocessableEntity,
          Localize.localize(putGpaProfReq.language, "successfull"),
          result["error"],
          ""
        );
        return res;
      } else {
        const res = new BaseResponse(
          resStatus.UnprocessableEntity,
          Localize.localize(putGpaProfReq.language, "studentCreate"),
          "",
          result
        );
        return res;
      }
    } catch (error) {
      Logy.log("error", error);
      const res = new BaseResponse(
        resStatus.UnprocessableEntity,
        Localize.localize(putGpaProfReq.language, "RequestError"),
        error,
        ""
      );
      return res;
    }
  };
}
