import { lang } from "../../utils/enums"; 3
import {  Request } from "express";
export interface getCourse {
  name: String;
  code: String;
  lang?: lang;
  limit: number;
  skip:number
}
export class GetCourseReq implements getCourse {
  name: String;
  code: String;
  limit: number;
  skip: number;
  language: lang;
  private request: Request;
  private body: any;
  constructor(getCourseRequest: Request) {
    this.request = getCourseRequest;
    this.name = '';
    this.code = ''
    this.skip = 0;
    this.limit = 10;
    this.language = lang.Arabic;
    this.body = this.request.body;
  }

  check() {
    try {
      let flag: boolean = true;
      console.log(this.body["fullmark"]);
      this.name =this.body["name"]
      this.code = this.body["code"] 
      this.skip =this.body["limit"]
      this.limit = this.body["skip"]
      this.language = this.body["lang"] || lang.Arabic;
    
      return flag
    } catch (error) {
      return false
    }
  }
}
