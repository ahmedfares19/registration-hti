import { resStatus } from "../../utils/enums";
export interface IResponse {
  body?: any;
  error?: any;
  message?: any;
  statusCode?: any;
}

export class BaseResponse implements IResponse {
  body: any;
  error: any;
  message: any;
  statusCode: any;
  constructor(statusCode: any, message: any, error: any, body: any) {
    this.statusCode = statusCode;
    this.error = error;
    this.body = body;
    this.message = message;
  }
  public response = () => {
    return {
      status: this.statusCode,
      message: this.message,
      error: this.error,
      body: this.body,
    };
  };
}
