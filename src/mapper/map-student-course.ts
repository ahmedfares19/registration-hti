
export class MapStudentCourse {
  public static map(studentCourseList:any) {
    for (const course of studentCourseList) {
      console.log(course);
      course.studentId.accessToken = undefined
      course.studentId._id = undefined
      course.studentId.createdAt = undefined
      course.studentId.updatedAt = undefined
      course.studentId.courses = undefined
      course.studentId.password = undefined;
      course.courseId.fullMark = undefined;
      course.courseId.createdAt = undefined;
      course.courseId.updatedAt = undefined;
    }
    return studentCourseList
  }
}