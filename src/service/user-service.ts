import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { getUserValidation, loginUserValidation, registerUserValidation } from "../validation/user-validation";
import { validate } from "../validation/validation";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async (request:Request) => {
    const user = validate(registerUserValidation, request);

    const countUser = await prismaClient.user.count({
        where: {
            username: user.username
        }
    });

    if (countUser === 1) {
        throw new ResponseError(400, "Username already exists");
    }

    user.password = await bcrypt.hash(user.password, 10);

    return prismaClient.user.create({
        data: user,
        select: {
            username: true,
            name: true
        }
    });
}

const login = async (request:Request) => {
    const loginRequest = validate(loginUserValidation, request);

    const user = await prismaClient.user.findUnique({
        where: {
            username: loginRequest.username
        }
    });

    if (!user) {
        throw new ResponseError(401, "Username or password wrong");
    }

    const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);
    if (!isPasswordValid) {
        throw new ResponseError(401, "Username or password wrong");
    }



    const token = jwt.sign({id:user.id,username:user.username}, "jsadkfervui4ey8e7v4jerhb8rtgbv", {
        expiresIn: "1d"
    })

    const refreshToken = jwt.sign({id:user.id,username:user.username}, "jsadkfervui4ey8e7v4jerhb8rtgbv", {
        expiresIn: "30d"
    })


    return {id:user.id, username:user.username, name:user.name, role:user.role, token, refreshToken}
}

const get = async (username:any) => {
    username = validate(getUserValidation, username);

    const user = await prismaClient.user.findUnique({
        where: {
            username: username
        },
        select: {
            username: true,
            name: true,
            role:true
        }
    });

    if (!user) {
        throw new ResponseError(404, "user is not found");
    }

    return user;
}
export default {
    register,
    login,
    get
}
