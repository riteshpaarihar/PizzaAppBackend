import AppError from "./appError.js";


class InternalServerError extends AppError {
    constructor() {
        super("Internal Server Error", 500);
        this.statusCode = 500;
        this.name = "InternalServerError";
        this.isOperational = true;
    }
}


export default InternalServerError;