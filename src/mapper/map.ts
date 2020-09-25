export class MAP {
  public static mapOne = (obj:any) => {
    obj['accessToken'] = undefined;
    obj['password'] = undefined;
    return obj
  } 
  public static mapMany = (objList:any) => {
    return objList.map(MAP.mapOne)
  }
}