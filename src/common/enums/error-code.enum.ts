const enum ErrorCode {
    AUTH_EMAIL_ALREADY_EXISTS = "AUTH_EMAIL_ALREADY_EXISTS",
    AUTH_INVALID_TOKEN = "AUTH_INVALID_TOKEN",
    AUTH_USER_NOT_FOUND = "AUTH_USER_NOT_FOUND",
    AUTH_NOT_FOUND = "AUTH_NOT_FOUND",
    AUTH_TOO_MANY_ATTEMPTS = "AUTH_TOO_MANY_ATTEMPTS",
    AUTH_UNAUTHORIZED_ACCESS = "AUTH_UNAUTHORIZED_ACCESS",
    AUTH_TOKEN_NOT_FOUND = "AUTH_TOKEN_NOT_FOUND",
    AUTH_PASSOWORD_WRONG = "AUTH_PASSWORD_DOESNOT_MATCH",
    AUTH_REGISTRATION_FAILED = "AUTH_REGISTRATION_FAILED",
  
    // Access Control Errors
    ACCESS_FORBIDDEN = "ACCESS_FORBIDDEN",
    ACCESS_UNAUTHORIZED = "ACCESS_UNAUTHORIZED",

    FAILED_SESSSION = "FAILED_TO_CREATE_SESSION",
  
    // Validation and Resource Errors
    VALIDATION_ERROR = "VALIDATION_ERROR",
    RESOURCE_NOT_FOUND = "RESOURCE_NOT_FOUND",
  
    // System Errors
    INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
    VERIFICATION_ERROR = "VERIFICATION_ERROR",
    SECRET_WRONG = "SECRET_WRONG",
  }
  
  export { ErrorCode };