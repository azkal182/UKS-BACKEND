import express from "express";
import { publicRouter } from "../route/public-api";
import { userRouter } from "../route/api";
import cors from "cors";
export const web = express();
web.use(express.json());
web.use(cors())
web.use(publicRouter);
web.use(userRouter);
