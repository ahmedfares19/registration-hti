
import { Logy } from '../utils/logy';
import { JWT } from '../utils/jwt';
import { Hash } from '../utils/Hash';
import { Error } from 'mongoose';
import { LoginReq } from '../interfaces/student/login';
import { LoginProfReq } from '../interfaces/prof/login';
import { GetStudentReq } from '../interfaces/student/getStudents';
import { ICourse } from '../models/course.model';
import Course from '../models/course.model';
import Prof, { IProf}from '../models/prof.model';
export class ProfDao {
  constructor() {}

  login = async(loginReq: LoginProfReq) => {
    try {
      let query: any ={};
      loginReq.username ? query.username = loginReq.username : null;
      loginReq.email ? query.email = loginReq.email : null;
      console.log(query);
      
      const prof = await Prof.findOne(query)
      console.log(prof);
      if (prof) { 
        const isCorrect = Hash.compare(loginReq.password.toString(), prof.password.toString())
        if (isCorrect) { 
          prof.accessToken = JWT.generateToken({id:prof._id});
          return await prof.save();
        } 
      } 
      return{error:'SudentNotFound'}
    } catch (error) {
      Logy.log('error', error)
      return error
    }
  }
  createNewProf= async(prof:IProf) => {
    try {
      prof.accessToken = JWT.generateToken({id:prof._id})
      prof.password = Hash.encrypt(prof.password.toString())
      return await prof.save()

    } catch (error) {
      Logy.log('error', error)
      return error
    }
  }
  getAllStudents = async (getProfRequest:GetStudentReq) => {
    try {
      let query={};
      getProfRequest.username?query['username'] = getProfRequest.username:null;
      getProfRequest.name?query['name'] = getProfRequest.name:null;
      getProfRequest.email ? query['email'] = getProfRequest.email : null;
      const skip = +getProfRequest.skip;
      const limit = +getProfRequest.limit;
      console.log(query);
      const students = await Prof.find(query).skip(skip).limit(limit);
      return students;
    } catch (error) {
      Logy.log('error',error)
      return ''
    }
  };
  createNewCourse = async (course:ICourse) => {
    try {
      const result = await course.save()
      if (!result)
          throw new Error("");
      return course
    } catch (error) {
      return error
    }
  }
}
