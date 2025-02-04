import AppError from "./appError.js";


class BadRequestError extends AppError {
    constructor(invailidParam) {
        let massage = "";
        invailidParam.forEach(param => massage += `${param}`);
        super(`Bad Request: Invalid ${massage}`);
        this.statusCode = 400;
    }
}


export default BadRequestError;