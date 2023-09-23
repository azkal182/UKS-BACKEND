import express from "express";
import userController from "../controller/user-controller";
import { authMiddleware } from "../middleware/auth-middleware";
import inapController from "../controller/inap-controller";

// @ts-ignore
const userRouter = new express.Router();
userRouter.use(authMiddleware);

userRouter.get('/api/users/current', userController.get);
userRouter.post('/api/inaps', inapController.register);
userRouter.patch('/api/inaps', inapController.changeStatus);

export {
    userRouter
}
