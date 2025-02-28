import AppError from "./appError.js";

class UnauthorizedError extends AppError {

    constructor(message = "Unauthorized access", statusCode = 401) {
        super(message, statusCode);
    }
}

export default UnauthorizedError;