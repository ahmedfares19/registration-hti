import { lang } from "../../utils/enums"; 3
import {  Request } from "express";
export interface getProfStudents {
  profUsername: String;
  courseCode: String;
  studentUserName: String;
  limit?: number;
  skip?:number
  language: lang;
}
export class GetProfStudentReq implements getProfStudents {
  profUsername: String;
  courseCode: String;
  studentUserName: String;
  skip: number;
  limit: number;
  language: lang;
  private request: Request;
  private body: any;
  constructor(gProfRequest: Request) {
    this.request = gProfRequest;
    this.body = this.request.body;
    this.profUsername =this.body["profUsername"] || '';
    this.courseCode = this.body["courseCode"] || ''
    this.studentUserName = this.body["studentUserName"] || ''
    this.skip = this.body["skip"] || 0
    this.limit = this.body["limit"] || 5
    this.language = lang.Arabic;
  
  }

}
