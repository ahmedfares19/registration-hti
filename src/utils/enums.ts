export enum lang {
  Arabic = "Ar",
  English = "En",
}

export enum resStatus {
  Successful = 200,
  created = 201,
  Unauthorized = 401,
  NotFound = 404,
  InternalServerError = 500,
  WrongInput = 400,
  UnprocessableEntity = 422,
  Forbidden = 403,
}

export enum profTypes {
  admin = 2,
  manger = 1,
  usual = 0,
}
