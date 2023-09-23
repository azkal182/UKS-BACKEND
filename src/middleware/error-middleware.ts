import { Request, Response, NextFunction} from 'express';

import {ResponseError} from "../error/response-error.js";

const errorMiddleware = async (err:Error, req:Request, res:Response, next:NextFunction) => {
    if (!err) {
        next();
        return;
    }

    if (err instanceof ResponseError) {
        // @ts-ignore
        res.status(err.status).json({
            errors: err.message
        }).end();
    }  else {
        res.status(500).json({
            errors: err.message
        }).end();
    }
}

export {
    errorMiddleware
}
