export class ApiError extends Error {
    constructor(message, statusCode){
        super(message);
        this.statusCode=statusCode
        this.status = '${statusCode}'.startsWith('4')?'fail':'error'
        this.isOperational=true // optional 

        Error.captureStackTrace(this, this.constructor);
    }
}

export const catchAsync=(fn) => {
       return (req, res, next ) => {
        fn(req, res, next).catch(next)

       };
};


//handle JWT error 

export const handleJWTError =() =>{
   new AppError('inavalid roken. Plese log in again ', 401)
}