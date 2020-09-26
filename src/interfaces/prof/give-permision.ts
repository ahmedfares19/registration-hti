import { lang, profTypes } from '../../utils/enums'; 3
import {  Request } from "express";
export interface givePermissionProf {
  username: String; 
  type:any
  lang?: lang;
}
export class GivePermissionReq implements givePermissionProf {
  username: String;
  type: any;
  language: lang;
  private request: Request;
  private body: any;
  constructor(cProfRequest: Request) {
    this.request = cProfRequest;
    this.username = "";

    this.type = profTypes.usual
    this.language = lang.Arabic;
    this.body = this.request.body;
  }

  check() {
    try {
      let flag: boolean = true;
      this.username = !this.body["username"]?flag =false:this.body["username"];
      this.type = profTypes[this.body["type"]]?profTypes[this.body["type"]]:profTypes.usual
      this.language = this.body["lang"] || lang.Arabic;
      return flag
    } catch (error) {
      return false
    }
  }
}
