const {ReasonPhrases, StatusCodes} = require('../utils/httpStatusCode')

const StatusCode = {
    FORBIDDEN: 403,
    CONFLICT: 409,
    INTERNAL_ERROR: 500
}
const ReasonStatusCode ={
    FORBIDDEN: 'Bad Request Error',
    CONFLICT: 'Conflict Error',
    INTERNAL_ERROR: 'Internal Server Error'
}
class ErrorResponse extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
        
    }
}

class ConflictRequestError extends ErrorResponse {
    constructor(message = ReasonStatusCode.CONFLICT, statusCode = StatusCode.FORBIDDEN) {
        super(message, statusCode)
    }
}

class BadRequestError extends ErrorResponse {
    constructor(message = ReasonStatusCode.CONFLICT, statusCode = StatusCode.FORBIDDEN) {
        super(message, statusCode)
    }
}

class InternalServerError extends ErrorResponse {

    constructor(message = ReasonStatusCode.INTERNAL_ERROR, statusCode = StatusCode.INTERNAL_ERROR) {
        super(message, statusCode)
    }
}

class AuthFailureError extends ErrorResponse {

    constructor(message = ReasonPhrases.UNAUTHORIZED, statusCode = StatusCodes.UNAUTHORIZED) {
        super(message, statusCode)
    }
}
module.exports = {
    ConflictRequestError, BadRequestError, InternalServerError, AuthFailureError
}