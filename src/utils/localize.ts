import { lang } from "./enums";
const ar = require("./../localize/ar.json");
const en = require("./../localize/en.json");

export class Localize {
  private static language: lang = lang.Arabic;
  private static _getFromJson = (language: lang, text) => {
    Localize.language = language;
    switch (Localize.language) {
      case lang.Arabic:
        return ar[text];
        break;
      case lang.English:
        return en[text];
        break;

    }
  };
  public static localize = (lang: lang, text) => {
    if (Localize._getFromJson(lang,text)) return Localize._getFromJson(lang,text);
    else return text;
  };
}
