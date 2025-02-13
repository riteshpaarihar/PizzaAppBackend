import AppError from "./appError.js";



class NotFoundError extends AppError {
    constructor(properties, resource) {
        let notfoundProperty = '';
        properties.forEach(property => notfoundProperty += `${property}`);
        super(`Not Found: No ${resource} found with ${notfoundProperty}`, 404);
    }
}


export default NotFoundError;