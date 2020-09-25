import { lang } from "../../utils/enums"; 3
import {  Request } from "express";
export interface StudentCourse {
  code: String;
  lang?: lang;
}
export class StudentCourseReq implements StudentCourse {
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
      let flag: boolean = true;
      this.code = !this.body["code"] ? flag = false : this.body["code"];
      this.language = this.body["lang"] || lang.Arabic;
    
      return flag
    } catch (error) {
      return false
    }
  }
}
