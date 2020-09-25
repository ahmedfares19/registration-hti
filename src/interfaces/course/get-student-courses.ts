import { lang } from "../../utils/enums"; 3
import {  Request } from "express";
export interface getStudentCourse {
  code?: String;
  lang?: lang;
}
export class GetStudentCourseReq implements getStudentCourse {
  code: String;
  language: lang;
  private request: Request;
  private body: any;
  constructor(cCourseRequest: Request) {
    this.request = cCourseRequest;
    this.code = ''
    this.language = lang.Arabic;
    this.body = this.request.body;
  }

  check() {
    try {
      this.code = this.body["code"];
      this.language = this.body["lang"] || lang.Arabic;
    } catch (error) {
      return false
    }
  }
}
