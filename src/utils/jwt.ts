import * as jwt from "jsonwebtoken";
import {Request,Response} from 'express';
import { Env } from './env';
import Student from '../models/student.model';
import { resStatus, lang } from './enums';
import { BaseResponse } from '../interfaces/general/base.response';
import { Localize } from './localize';
import { Logy } from './logy';
import Prof from '../models/prof.model';

export class JWT {
  public static generateToken = (data: {}) => {
    return jwt.sign( data , Env.JWTSECRECT);
  };
  public static verifyToken = (token: String) => {
    try {
      var decoded = jwt.verify(token, 'wrong-secret');
      return decoded
    } catch (error) {
      return error
    }
  }
  public static StudentAuth = async (request:Request, response:Response, next) => {
    try {
    
      
      const token = request.header('Authorization')?.replace('Bearer ', '')
        const decode = jwt.verify(token, Env.JWTSECRECT);
        const student = await Student.findOne({
            _id: decode.id,
            'accessToken': token
        })
        if (!student) {
            throw new Error(Localize.localize(request.body.lang || lang.Arabic,'StudentNotFound'))
      }
        //to save the student so we can access to it in the router
        request['student'] = student;
      request['token'] = token;
        next()
    } catch (err) {
      const newResponse = new BaseResponse(
        resStatus.WrongInput,
        "",
        Localize.localize(request.body.lang || lang.Arabic, "Unauthorized"),
        ""
      );
      response.status(resStatus.Unauthorized).send(newResponse);
    }
  }
  public static ProfAuth = async (request:Request, response:Response, next) => {
    try {
      console.log('t');
      const token = request.header('Authorization')?.replace('Bearer ', '')
        const decode = jwt.verify(token, Env.JWTSECRECT);
        const prof = await Prof.findOne({
            _id: decode.id,
            'accessToken': token
        })
      console.log({token,decode});
        if (!prof) {
            throw new Error(Localize.localize(request.body.lang || lang.Arabic,'StudentNotFound'))
      }
        //to save the student so we can access to it in the router
      request['prof'] = prof;
      request['token'] = token;
        next()
    } catch (err) {
      const newResponse = new BaseResponse(
        resStatus.WrongInput,
        "",
        Localize.localize(request.body.lang || lang.Arabic, "Unauthorized"),
        ""
      );
      response.status(resStatus.Unauthorized).send(newResponse);
    }
}
}
