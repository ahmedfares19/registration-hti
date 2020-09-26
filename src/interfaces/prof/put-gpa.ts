import { lang, profTypes } from '../../utils/enums'; 3
import {  Request } from "express";
export interface putGpaProf {
  username: String; 
  courseCode: String,
  mark:String,
  lang?: lang;
}
export class PutGpaProfReq implements putGpaProf {
  username: String;
  courseCode: any;
  mark: String;
  language: lang;
  private request: Request;
  private body: any;
  constructor(cProfRequest: Request) {
    this.request = cProfRequest;
    this.username = "";
    this.courseCode = "";
    this.mark = '0';
    this.language = lang.Arabic;
    this.body = this.request.body;
  }

  check() {
    try {
      let flag: boolean = true;
      this.username = !this.body["username"]?flag =false:this.body["username"];
      this.mark = !this.body["mark"] ? flag = false : this.body["mark"];
      this.courseCode = !this.body["courseCode"] ? flag = false : this.body["courseCode"];
      this.language = this.body["lang"] || lang.Arabic;
      return flag
    } catch (error) {
      return false
    }
  }
}
