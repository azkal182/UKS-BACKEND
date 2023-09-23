import express from "express";
import userController from "../controller/user-controller";
// @ts-ignore
const publicRouter = new express.Router();
publicRouter.post('/api/users', userController.register);
publicRouter.post('/api/login', userController.login);

export {
    publicRouter
}
