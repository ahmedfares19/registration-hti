import { IStudent } from '../models/student.model';
import { Logy } from '../utils/logy';
export interface ProfStudent {
  course: String,
  student: {
    name: String,
    userName:String
  }[]
}
export class MapTeacherStudents {
  public static mapOne = (course: any, courseList: any[]) => {
   try {
    let profStudentsList: ProfStudent = <ProfStudent>{};
     profStudentsList.course = course
     console.log(courseList[0]);
    for (const student of courseList) {
      console.log(student.studentId.name);
      console.log(student.studentId.username);
      profStudentsList.student.push({
        name: student.studentId.name,
        userName:student.studentId.username
      })
    }
    // console.log('t', profStudentsList);
    return profStudentsList
   } catch (error) {
     return error
   }
  } 
  public static mapMany = (objList:any) => {
    try {
      return objList.map((obj) => {
        MapTeacherStudents.mapOne(obj.course,obj.student)
      })
    } catch (error) {
      return error
    }
  }
}