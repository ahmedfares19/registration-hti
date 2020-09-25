import { lang } from "../../utils/enums"; 3
import {  Request } from "express";
export interface createProf {
  username: String;
  password: String;
  lang?: lang;
}
export class CreateProfReq implements createProf {
  username: String;
  password: String;
  name: String;
  email: String;
  language: lang;
  private request: Request;
  private body: any;
  constructor(cProfRequest: Request) {
    this.request = cProfRequest;
    this.username = "";
    this.name = ''
    this.email = ''
    this.password = "";
    this.language = lang.Arabic;
    this.body = this.request.body;
  }

  check() {
    try {
      let flag: boolean = true;
      this.username = !this.body["username"]?flag =false:this.body["username"];
      this.password = !this.body["password"] ? flag = false : this.body["password"];
      this.name = !this.body["name"]?flag =false:this.body["name"];
      this.email = !this.body["email"]?flag =false:this.body["email"];
      this.language = this.body["lang"] || lang.Arabic;
      return flag
    } catch (error) {
      return false
    }
  }
}
