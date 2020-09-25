import * as bcryptjs from "bcryptjs";
import { Env } from "./env";
export class Hash {
    private static salt = bcryptjs.genSaltSync( +Env.HASHSERCET);
  public static encrypt = (text: string) => {
    return bcryptjs.hashSync(text, Hash.salt);
  };
  public static compare(text: string, hash: string) {
    return bcryptjs.compareSync(text, hash);
  }
}
