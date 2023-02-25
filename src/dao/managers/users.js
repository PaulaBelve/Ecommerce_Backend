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

        const findUser = await userModel
            .findById(id)
            .populate("carts.cart")
            .lean();

        return findUser

    }

    // Asociar el user con el cartID

    updateUser = async (userEmail, cid) => {

        const findCart = await userModel.findOne({ "carts.cart": cid });

        if (findCart) {
            const updateCart = await userModel.updateOne({ "carts.cart": cid }, cid);

            return updateCart;
        }

        user.carts.push({ cart: cid });

        const result = await userModel.updateOne({ email: userEmail }, user);

        return result;


    }


}