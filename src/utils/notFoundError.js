import AppError from "./appError.js";

// This is the default error handler for the application 
class NotFoundError extends AppError {
    constructor(properties, resource) {
        let notFoundProperty = "";
        properties.forEach(property => notFoundProperty += `${property}`);
        super(`The resource "${resource}" with the ${notFoundProperty} not found`, 404);
    }
}


export default NotFoundError;