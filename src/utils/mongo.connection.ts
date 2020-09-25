import mongoose from "mongoose";
import { Env } from "./env";
import { Logy } from "./logy";
// mongo config
const _dbFullURL = Env.dbURL + Env.dbNAME;
const _dbOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
};
// db connection function
console.log({ _dbFullURL });
mongoose
  .connect(_dbFullURL, _dbOptions)
  .then(() => {
    Logy.log("debug", `connected to ${_dbFullURL}`);
  })
  .catch((error) => {
    Logy.log("error", error);
  });
