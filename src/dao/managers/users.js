import { NotFoundError, ValidationError } from "../../utils/index.js";
import { userModel } from "../models/user.model.js";




export class UserManager {

    // Crear un nuevo usuario
    userCreate = async (newUser) => {


        const result = await userModel.create(newUser);


        if (!result) {

            throw new ValidationError('FAILED TO ADD TO DATA BASE')
        }

        return result

    }

    // Loguear usuario

    userLogin = async (email, password) => {

        const findUser = await userModel.findOne({ email, password }).lean()

        if (!findUser) { throw new ValidationError('USER NOT FOUND') }



        return findUser


    }

    // Agregar todos los usuarios

    getAllUser = async () => {

        const result = await userModel.find().lean()

        if (!result) {

            throw new ValidationError('USERS NOT FOUND')
        }

        return result
    }

    getUserByEmail = async (email) => {

        const findUser = await userModel.findOne(email);

        return findUser


    }

    getUserById = async (id) => {

        const findUser = await userModel.findById(id);

        return findUser

    }

}