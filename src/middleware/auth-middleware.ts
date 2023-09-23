import { NextFunction, Response, Request } from "express";
import { prismaClient } from "../application/database.js";
import jwt from "jsonwebtoken";
export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.get('Authorization');
    if (!token) {
        res.status(401).json({
            errors: "Unauthorized"
        }).end();
    } else {
        console.log(token)
        const verified = jwt.verify(token.split('Bearer ')[1], "jsadkfervui4ey8e7v4jerhb8rtgbv")
        // const user = await prismaClient.user.findFirst({
        //     where: {
        //         token: token
        //     }
        // });
        // if (!user) {
        //     res.status(401).json({
        //         errors: "Unauthorized"
        //     }).end();
        // } else {
        //     req.user = user;
        //     next();
        // }
        // next();
        if (verified) {
            // @ts-ignore
            req.user = verified;
            next()
        } else {
            res.status(401).json({
                errors: "Unauthorized"
            }).end();
        }
    }
}
