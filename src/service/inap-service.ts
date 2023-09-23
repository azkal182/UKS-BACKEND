import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { changeStatusValidation, registerInapValidation } from "../validation/inap-validation";
import { validate } from "../validation/validation";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async (request: Request, userId:number) => {
    const patientValidate = validate(registerInapValidation, request);



    // Membuat data pasien (patient)
    const patient = await prismaClient.patient.create({
        data: {
            name: patientValidate.patient.name,
            address: patientValidate.patient.address,
            grade: patientValidate.patient.grade,
            hostel: patientValidate.patient.address,
        },
    });



    return prismaClient.inap.create({
        data: {
            userId: userId,
            patientId: patient.id,
            complaint: patientValidate.complaint,
            status: 'DI UKS',
        },
    });
}

const changeStatus =async (request:Request) => {
    const statusVerified = validate(changeStatusValidation, request)


    return prismaClient.inap.update({
        where:{
            id: statusVerified.id
        },
        data:{
            returnAt: new Date(),
            status: statusVerified.status
        }
    })
}

export default {
    register,
    changeStatus
}
