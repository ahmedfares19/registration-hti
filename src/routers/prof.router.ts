import { StudentController } from "../controllers/student.controller";
import { Router, Request, Response } from "express";
import { Logy } from "../utils/logy";
import { Localize } from "../utils/localize";
import { lang, resStatus, profTypes } from '../utils/enums';
import { CreateStudentReq } from "../interfaces/student/createStudent";
import { BaseResponse } from "../interfaces/general/base.response";
import { LoginReq, login } from '../interfaces/student/login';
import { CreateProfReq } from '../interfaces/prof/create.prof';
import { ProfController } from '../controllers/prof.controller';
import { LoginProfReq } from '../interfaces/prof/login';
import { IProf } from '../models/prof.model';
import { JWT } from '../utils/jwt';
import { getProf } from '../interfaces/prof/get-prof';
import { GetStudentReq } from '../interfaces/student/getStudents';
import { CreateCourseReq } from '../interfaces/course/create-course';
import { DropCourseReq } from '../interfaces/course/drop-course';
import { GetCourseReq, getCourse } from '../interfaces/course/get-courses';
import { GivePermissionReq } from '../interfaces/prof/give-permision';
import { PutGpaProfReq } from '../interfaces/prof/put-gpa';
import { GetProfStudentReq } from '../interfaces/prof/get-student';

export class ProfRouter {
  private profContoller: ProfController;

  // this router depends on student controller
  constructor(private router: Router, profController: ProfController) {
    this.profContoller = profController;

    // prof routes
    this.router.post("/get-profs",JWT.ProfAuth, this.getProfs);
    this.router.post("/create-prof", this.createNewProf);
    this.router.post("/login", this.login);
    this.router.post("/logout",JWT.ProfAuth, this.logout);
    this.router.post("/add-course", JWT.ProfAuth,this.addCourse);
    this.router.post("/drop-course", JWT.ProfAuth, this.dropCourse);
    this.router.post("/get-course", JWT.ProfAuth, this.getCourses);
    this.router.post("/give-permission", JWT.ProfAuth, this.givePermission);
    this.router.post('/put-gpa',JWT.ProfAuth , this.putGpa)
  }

  login =async (request: Request, response: Response) => {
    Logy.log('info', 'login student called')
    const loginReq = new LoginProfReq(request);
    if (loginReq.check()) {
      const result = await this.profContoller.login(
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
  };
  createNewProf = async (request: Request, response: Response) => {
    try {
      const createProfReq = new CreateProfReq(request);
      if (createProfReq.check()) {
        const result = await this.profContoller.createNewProf(
          createProfReq
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
      const prof: IProf = request['prof'];
      prof.accessToken = ''
      await prof.save();
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
  addCourse = async (request:Request ,response:Response) => {
    try {
      const createCourseReq = new CreateCourseReq(request);
      if (createCourseReq.check()) {
        
        const result = await this.profContoller.createNewCourse(
          createCourseReq
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
  dropCourse = async (request:Request ,response:Response) => {
    try {
      const dropCourseReq = new DropCourseReq(request);
      if (dropCourseReq.check()) {
        
        const result = await this.profContoller.dropCourse(
          dropCourseReq
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
  givePermission = async (request:Request ,response:Response) => {
    try {
      const prof = request['prof'];
    
      const givePermissionReq = new GivePermissionReq(request); 

      if (givePermissionReq.check()) {
        console.log('one');
        const permission = +prof.type > +givePermissionReq.type;
        console.log(prof.type,givePermissionReq.type);
        if (+prof.type > +givePermissionReq.type) {
          console.log('two');
          const result = await this.profContoller.givePermission(
            givePermissionReq
          );
          response.status(result.statusCode).send(result)
        } else {
          Logy.log(
            "error",
            Localize.localize(request.body.lang || lang.Arabic, "WrongData")
          );
          const newResponse = new BaseResponse(
            resStatus.Forbidden,
            "",
            Localize.localize(request.body.lang || lang.Arabic, "WrongData"),
            ""
          );
          response.status(resStatus.WrongInput).send(newResponse);
        }
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
      
    }
  }
  getCourses = async (request:Request ,response:Response) => {
    try {
      
      const getCourseReq = new GetCourseReq(request);

      if (getCourseReq.check()) {
        const result = await this.profContoller.getCourse(
          getCourseReq
        );
        Logy.log('debug','here3')
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
  getProfs = async (request:Request ,response:Response) => {
    try {
      
      const getProfReq = new GetStudentReq(request);

      if (getProfReq.check()) {
        const result = await this.profContoller.getProfs(
          getProfReq
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
  putGpa = async (request:Request ,response:Response) => {
    try {
      try {
        const putGpaProfReq = new PutGpaProfReq(request);
        if (putGpaProfReq.check()) {
          
          const result = await this.profContoller.putGpa(
            putGpaProfReq
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
    } catch (error) {
      
    }
  }

}
