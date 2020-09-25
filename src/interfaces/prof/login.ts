import { lang } from "../../utils/enums"; 3
import {  Request } from "express";
export interface loginProf {
  username?: String;
  email?: String;
  password: String;
  lang?: lang;
}
export class LoginProfReq implements loginProf {
  username: String;
  password: String;
  email: String;
  language: lang;
  private request: Request;
  private body: any;
  constructor(loginProfRequest: Request) {
    this.request = loginProfRequest;
    this.username = "";
    this.email = ''
    this.password = "";
    this.language = lang.Arabic;
    this.body = this.request.body;
  }

  check() {
    try {
      let flag: boolean = true;
      this.username = !this.body["username"]?flag =false:this.body["username"];
     this.email = !this.body["email"]?flag =false:this.body["email"];
      if (this.username || this.email) flag = true
      this.password = !this.body["password"] ? flag = false : this.body["password"];
      this.language = this.body["lang"] || lang.Arabic;
      return flag
    } catch (error) {
      return false
    }
  }
}
