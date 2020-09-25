import express, { Request, Response } from "express";
import * as path from "path";
import * as dotenv from "dotenv";
//load env vars
dotenv.config({ path: __dirname + "/env/.env" });
import { Env } from "./utils/env";
import * as bodyParser from "body-parser";
// DB connection
require("./utils/mongo.connection");
// get backend class
import { Backend } from "./Backend";
// application object from express
const application: express.Application = express();
application.use(bodyParser.json());
// use ejs as templete engine to render views files
application.set("view engine", "ejs");
// set the view path
application.set("views", path.join(__dirname, "views/pages/"));
// set where to find static files like css imgs etc
application.use(express.static(path.join(__dirname, "assets")));
// render/serve Home Screen
application.get("/", (req: Request, res: Response) => {
  res.render(path.join("home.ejs"));
});
// render/serve API Screen
application.get("/apis", (req: Request, res: Response) => {
  res.render(path.join("apis.ejs"), { apis: apiList });
});
// new object from back end
const backend: Backend = new Backend(express.Router(), application);
// get PORT from env vars
const PORT: any = Env.PORT;
// start back-end
backend.start(PORT);

const apiList = [
  {
    title: "Student",
    apis: [
      "student/login",
      "student/logout",
      "student/get-studets",
      "student/create-student",
      "student/add-course",
      "student/drop-course",
      "student/get-course",
    ],
  },
  {
    title: "Prof",
    apis: [
      "prof/login",
      "prof/logout",
      "prof/get-profs",
      "prof/create-prof",
      "prof/add-course",
      "prof/drop-course",
      "prof/get-course",
      "prof/give-permission",
      "prof/student-course",
    ],
  },
];
