import { StudentController } from "../controllers/student.controller";
import { Router, Request, Response } from "express";
import { Logy } from "../utils/logy";
import { Localize } from "../utils/localize";
import { lang, resStatus } from '../utils/enums';
import { CreateStudentReq } from "../interfaces/student/createStudent";
import { BaseResponse } from "../interfaces/general/base.response";
import { LoginReq, login } from '../interfaces/student/login';
import { JWT } from '../utils/jwt';
import { IStudent } from '../models/student.model';
import { GetStudentReq } from '../interfaces/student/getStudents';
import { StudentCourseReq, StudentCourse } from '../interfaces/course/add-student-course';
import { GetStudentCourseReq } from '../interfaces/course/get-student-courses';

export class StudentRouter {
  private studentContoller: StudentController;

  // this router depends on student controller
  constructor(private router: Router, studentContoller: StudentController) {
    this.studentContoller = studentContoller;

    // student routes
    this.router.post("/get-student", JWT.StudentAuth,this.getStudents);
    this.router.post("/create-student", this.createNewStudent);
    this.router.post("/login", this.login);
    this.router.post("/logout", JWT.StudentAuth, this.logout);
    this.router.post("/add-course",JWT.StudentAuth, this.addCourse);
    this.router.post("/drop-course", JWT.StudentAuth, this.dropCourse);
    this.router.post("/get-course",  JWT.StudentAuth,this.getCourse);
  }


  login = async (request: Request, response: Response) => {
    try {
      Logy.log('info', 'login student called')
    const loginReq = new LoginReq(request);
    if (loginReq.check()) {
      const result = await this.studentContoller.login(
        loginReq
      );
      response.status(result.statusCode).send(result)
    } else {
      Logy.log(
        "error",
        Localize.localize(request.body.lang || lang.Arabic, "WrongData")
      );
      const newResponse = new BaseResponse(
        resStatus.WrongInput,
        "",
        Localize.localize(request.body.lang || lang.Arabic, "WrongData"),
        ""
      );
      response.status(resStatus.WrongInput).send(newResponse);
    }
    } catch (error) {
      const newResponse = new BaseResponse(
        resStatus.UnprocessableEntity,
        "",
        Localize.localize(request.body.lang || lang.Arabic, "RequestError"),
        ""
      );
      response.status(resStatus.WrongInput).send(newResponse);
    }
  };
  logout = async (request:Request , response:Response) => {
      try {
        Logy.log('info', 'logout called')
        const student: IStudent = request['student'];
        student.accessToken = ''
        await student.save();
        response.send('logedOut')
      } catch (error) {
        const newResponse = new BaseResponse(
          resStatus.UnprocessableEntity,
          "",
          Localize.localize(request.body.lang || lang.Arabic, "RequestError"),
          ""
        );
        response.status(resStatus.WrongInput).send(newResponse);
      }
  }
  createNewStudent = async (request: Request, response: Response) => {
    try {
      const createStudentReq = new CreateStudentReq(request);
      if (createStudentReq.check()) {
        const result = await this.studentContoller.createNewStudent(
          createStudentReq
        );
        response.status(result.statusCode).send(result)
      } else {
        Logy.log(
          "error",
          Localize.localize(request.body.lang || lang.Arabic, "WrongData")
        );
        const newResponse = new BaseResponse(
          resStatus.WrongInput,
          "",
          Localize.localize(request.body.lang || lang.Arabic, "WrongData"),
          ""
        );
        response.status(resStatus.WrongInput).send(newResponse);
      }
    } catch (error) {
      const newResponse = new BaseResponse(
        resStatus.UnprocessableEntity,
        "",
        Localize.localize(request.body.lang || lang.Arabic, "RequestError"),
        ""
      );
      response.status(resStatus.WrongInput).send(newResponse);
    }
  };
  getStudents = async (request: Request, response: Response) => {
    try {
      const getStudentReq = new GetStudentReq(request);
      if (getStudentReq.check()) {
        const result = await this.studentContoller.getStudents(
          getStudentReq
        );
        response.status(result.statusCode).send(result)
      } else {
        Logy.log(
          "error",
          Localize.localize(request.body.lang || lang.Arabic, "WrongData")
        );
        const newResponse = new BaseResponse(
          resStatus.WrongInput,
          "",
          Localize.localize(request.body.lang || lang.Arabic, "WrongData"),
          ""
        );
        response.status(resStatus.WrongInput).send(newResponse);
      }
    } catch (error) {
      const newResponse = new BaseResponse(
        resStatus.UnprocessableEntity,
        "",
        Localize.localize(request.body.lang || lang.Arabic, "RequestError"),
        ""
      );
      response.status(resStatus.WrongInput).send(newResponse);
    }
  }
  addCourse = async (request:Request,response:Response) => {
    try {
      const createStudentCourseReq = new StudentCourseReq(request);
      const student: IStudent = request['student'];
      if (createStudentCourseReq.check()) {
        const result = await this.studentContoller.addStudentCourse(
          student,
          createStudentCourseReq
        );
        response.status(result.statusCode).send(result)
      } else {
        Logy.log(
          "error",
          Localize.localize(request.body.lang || lang.Arabic, "WrongData")
        );
        const newResponse = new BaseResponse(
          resStatus.WrongInput,
          "",
          Localize.localize(request.body.lang || lang.Arabic, "WrongData"),
          ""
        );
        response.status(resStatus.WrongInput).send(newResponse);
      }
    } catch (error) {
      const newResponse = new BaseResponse(
        resStatus.UnprocessableEntity,
        "",
        Localize.localize(request.body.lang || lang.Arabic, "RequestError"),
        ""
      );
      response.status(resStatus.WrongInput).send(newResponse);
    }
  }
  dropCourse = async (request:Request,response:Response) => {
    try {
      const dropStudentCourseReq = new StudentCourseReq(request);
      const student: IStudent = request['student'];
      if (dropStudentCourseReq.check()) {
        const result = await this.studentContoller.dropStudentCourse(
          student,
          dropStudentCourseReq
        );
        response.status(result.statusCode).send(result)
      } else {
        Logy.log(
          "error",
          Localize.localize(request.body.lang || lang.Arabic, "WrongData")
        );
        const newResponse = new BaseResponse(
          resStatus.WrongInput,
          "",
          Localize.localize(request.body.lang || lang.Arabic, "WrongData"),
          ""
        );
        response.status(resStatus.WrongInput).send(newResponse);
      }
    } catch (error) {
      const newResponse = new BaseResponse(
        resStatus.UnprocessableEntity,
        "",
        Localize.localize(request.body.lang || lang.Arabic, "RequestError"),
        ""
      );
      response.status(resStatus.WrongInput).send(newResponse);
    }
  }
  getCourse = async (request:Request,response:Response) => {
    try {
      const getStudentCourseReq = new GetStudentCourseReq(request);
      // from middleware
      const student: IStudent = request['student'];
        const result = await this.studentContoller.getStudentCourse(
          student,
          getStudentCourseReq
        ); 
        response.status(result.statusCode).send(result)
    } catch (error) {
      const newResponse = new BaseResponse(
        resStatus.UnprocessableEntity,
        "",
        Localize.localize(request.body.lang || lang.Arabic, "RequestError"),
        ""
      );
      response.status(resStatus.WrongInput).send(newResponse);
    }
  }
}
