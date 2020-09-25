import { lang } from "../../utils/enums";
3;
import { Request } from "express";
export interface dropCourse {
  code: String;
  lang?: lang;
}
export class DropCourseReq implements dropCourse {
  code: String;
  language: lang;
  private request: Request;
  private body: any;
  constructor(dropCourseRequest: Request) {
    this.request = dropCourseRequest;
    this.code = "";
    this.language = lang.Arabic;
    this.body = this.request.body;
  }

  check() {
    try {
      let flag: boolean = true;
      console.log(this.body["fullmark"]);
      this.code = !this.body["code"] ? (flag = false) : this.body["code"];
      this.language = this.body["lang"] || lang.Arabic;

      return flag;
    } catch (error) {
      return false;
    }
  }
}
