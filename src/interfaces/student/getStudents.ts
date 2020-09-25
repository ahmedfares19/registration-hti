import { lang } from "../../utils/enums"; 3
import {  Request } from "express";
export interface getStudent {
  username: String;
  name: String;
  email: String;
  limit?: number;
  skip?:number
  language: lang;
}
export class GetStudentReq implements getStudent {
  username: String;
  name: String;
  email: String;
  skip: number;
  limit: number;
  language: lang;
  private request: Request;
  private body: any;
  constructor(gStudentRequest: Request) {
    this.request = gStudentRequest;
    this.username = "";
    this.name = ''
    this.email = ''
    this.skip = 0;
    this.limit = 5;
    this.language = lang.Arabic;
    this.body = this.request.body;
  }

  check() {
    try {
      let flag: boolean = true;
      this.username = this.body["username"];
      this.name = this.body["name"]
      this.email = this.body["email"]
      this.skip = this.body["skip"]
      this.limit = this.body["limit"]
      this.language = this.body["lang"] || lang.Arabic;
      return flag
    } catch (error) {
      return false
    }
  }
}
