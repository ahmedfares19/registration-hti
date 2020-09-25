const chalk = require("chalk");
import fs from "fs";
import { v4 as uuid } from "uuid";
import * as path from "path";

interface levels {
  info: string;
  error: string;
  debug: string;
}
interface logDate {
  level: string;
  message: string;
  timeStamp: string;
  id: string;
}
export class Logy {
  public static logger = new Logy();
  private static filePath: string = path.join(__dirname, "logger.log");
  public static levels: levels = {
    info: "info",
    error: "error",
    debug: "debug",
  };
  private constructor() {}
  private static emojes = {
    star: "⭐",
    heart: "❤️",
    correct: "✔️",
    correctBlue: "☑️",
    pencile: "✏️",
    wrong: "⛔",
    redCircile: "⭕",
    redWrong: "❌",
    play: "▶️",
  };
  
  //get time and date function
  private getCurrentTimeStamp(): string {
    const str =
      String(new Date().getFullYear()) +
      "/" +
      String(new Date().getUTCMonth()+1) +
      "/" +
      String(new Date().getDate()) +
      " " +
      String(new Date().getHours()) +
      ":" +
      String(new Date().getMinutes()) +
      ":" +
      String(new Date().getSeconds());
    return str;
  }

  //data will be loged
  private static logedDataToFile: any={};
  //log functoin
  public static log = (level: string, message: any) => {
    const data: logDate = {
      level: level,
      message,
      timeStamp:  Logy.logger.getCurrentTimeStamp(),
      id: uuid(),
    };
  
    if (level == Logy.levels.error) {
      console.log("");
      console.log(chalk.bgRed.bold.white(`          [${data.level.toUpperCase()}]          `));
      console.log('');
      console.log(chalk.red.bold(`${Logy.emojes.wrong} ` +JSON.stringify(data.message) ));
      console.log(chalk.green(`${Logy.emojes.correct}  ` + data.id + " "));
      console.log(chalk.green(`${Logy.emojes.correct}  `+data.timeStamp));
      console.log("");
      Logy.logedDataToFile.level = `${Logy.emojes.wrong}  ` +data.level.toUpperCase();
      Logy.logedDataToFile.message = `${Logy.emojes.wrong}  ` +JSON.stringify(data.message);
      Logy.logedDataToFile.id = `${Logy.emojes.correct}  ` +JSON.stringify(data.id);
      Logy.logedDataToFile.timeStamp = `${Logy.emojes.correct}  ` + data.timeStamp;
      Logy.writeFile()
    } else if (level == Logy.levels.info) {
      console.log("");
      console.log(chalk.bgCyan.bold.black(`          [${data.level.toUpperCase()}]          `));
      console.log('');
      console.log(chalk.cyan.bold(`${Logy.emojes.pencile}  ` +JSON.stringify(data.message) ));
      console.log(chalk.green(`${Logy.emojes.correct}  ` + data.id + " "));
      console.log(chalk.green(`${Logy.emojes.correct}  `+data.timeStamp));
      console.log("");
      Logy.logedDataToFile.level =`${Logy.emojes.pencile}  ` + data.level.toUpperCase();
      Logy.logedDataToFile.message = `${Logy.emojes.pencile}  ` +JSON.stringify(data.message);
      Logy.logedDataToFile.id = `${Logy.emojes.correct}  ` +JSON.stringify(data.id);
      Logy.logedDataToFile.timeStamp = `${Logy.emojes.correct}  ` + data.timeStamp;
      Logy.writeFile()
    } else if (level == Logy.levels.debug) {
      console.log("");
      console.log(
        chalk.bgMagenta.bold.white(`          [${data.level.toUpperCase()}]          `)
      );
      console.log('');
      console.log(chalk.magenta.bold(`${Logy.emojes.star}  ` + JSON.stringify(data.message) ));
      console.log("");
    }
   
  };

  private static writeFile() {
    if (fs.existsSync(Logy.filePath)) {
      fs.appendFileSync(Logy.filePath,'\n{\n')
      for (const item in Logy.logedDataToFile) {
  
        fs.appendFileSync(Logy.filePath, `\t  ${item == 'message' || item == 'level' ?item:''} ${Logy.logedDataToFile[item]}\n`)
      }
      fs.appendFileSync(Logy.filePath,'\n}')
    } else {
      fs.writeFileSync(Logy.filePath,'\n{\n')
      for (const item in Logy.logedDataToFile) {
        fs.writeFileSync(Logy.filePath,`\t   ${item == 'message' || item == 'level' ?item:''} ${Logy.logedDataToFile[item]}\n`)
      }
      fs.writeFileSync(Logy.filePath,'\n}')
    }
  }
}
