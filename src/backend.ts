import express, { application, Application, Router } from "express";
import { Logy } from './utils/logy';
//student three layers
import { StudentRouter } from './routers/student.router';
import { StudentController } from './controllers/student.controller';
import { StudentDao } from './dao/student.dao';
import { ProfDao } from './dao/prof.dao';
import { ProfController } from './controllers/prof.controller';
import { ProfRouter } from './routers/prof.router';
import { CourseDao } from './dao/course.dao';

export class Backend {
  application: express.Application;
  constructor(router:Router,application: express.Application) {
    this.application = application;
    // dependency injection for student three layers 
    const studentRouterObject = express.Router();
    const studentDao: StudentDao = new StudentDao();
    const studentController: StudentController = new StudentController(studentDao);
    new StudentRouter(studentRouterObject, studentController)
    //PROF
    const profRouterObject = express.Router();
    const profDao: ProfDao = new ProfDao();
    const courseDao: CourseDao = new CourseDao();
    const profController: ProfController = new ProfController(profDao,courseDao);
    new ProfRouter(profRouterObject, profController)
    
    // use the router object 
    application.use('/student', studentRouterObject)
    application.use('/prof',profRouterObject)
  }

  // start backend
  start(PORT: number) {
    this.application.listen(PORT, () => {
     Logy.log('debug',"server is up at http://localhost:" + PORT || 5000)
    });
  }
}
