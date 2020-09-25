import { lang } from "../../utils/enums"; 3
import {  Request } from "express";
export interface createCourse {
  name: String;
  code: String;
  fullmark: number;
  lang?: lang;
}
export class CreateCourseReq implements createCourse {
  name: String;
  code: String;
  fullmark: number;
  language: lang;
  private request: Request;
  private body: any;
  constructor(cCourseRequest: Request) {
    this.request = cCourseRequest;
    this.name = '';
    this.code = ''
    this.fullmark = 0
    this.language = lang.Arabic;
    this.body = this.request.body;
  }

  check() {
    try {
      let flag: boolean = true;
      console.log(this.body["fullmark"]);
      this.name =!this.body["name"]?flag =false:this.body["name"];
      this.code = !this.body["code"] ? flag = false : this.body["code"];
      this.fullmark = !this.body["fullmark"]?flag =false:this.body["fullmark"];
      this.language = this.body["lang"] || lang.Arabic;
    
      return flag
    } catch (error) {
      return false
    }
  }
}
