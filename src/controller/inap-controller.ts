import { Request, Response, NextFunction } from "express";
import inapService from "../service/inap-service";

const register = async (req:Request, res:Response, next:NextFunction) => {
    try {
         // @ts-ignore
        const result = await inapService.register(req.body, req.user.id);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const changeStatus = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const result = await inapService.changeStatus(req.body);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

export default {
    register,
    changeStatus
}
