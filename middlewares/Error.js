const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;

     if(err.code === 11000) {
            // const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
            // err = new ErrorHandler(message, 400);
            err.message = `Duplicate ${Object.keys(err.keyValue)} entered`;
            err.statusCode = 400;
        }

     res.status(err.statusCode).json({
          message: err.message,
          success: false,
     });
    };

export default errorMiddleware;