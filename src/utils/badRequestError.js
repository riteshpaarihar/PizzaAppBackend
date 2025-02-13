import AppError from "./appError.js";


class BadRequestError extends AppError {
    constructor(invailidParam) {
        let massage = "";
        invailidParam.forEach(param => massage += `${param}\n`);
        super(`Bad Request: Invalid ${massage}`, 400);

    }
}


export default BadRequestError;