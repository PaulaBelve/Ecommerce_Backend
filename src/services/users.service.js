import { NotFoundError, ValidationError } from "../utils/index.js";
import { userModel } from "../dao/models/user.model.js";


class UserServices {

    // Crear un nuevo usuario
    userCreate = async (data) => {


        const newUser = await userModel.create(data);


        if (!result) {

            throw new ValidationError('FAILED TO ADD TO DATA BASE')
        }

        return newUser

    }

    // Mostrar todos los usuarios

    getAllUsers = async () => {

        const allUsers = await userModel.find().lean().exec();

        if (!result) {

            throw new ValidationError('USERS NOT FOUND')
        }

        return allUsers;
    }

    // Encontrar usuario

    getUser = async (data) => {

        const user = await userModel.findOne({ email: data }).lean().exec()

        if (!user) { throw new ValidationError('USER NOT FOUND') }



        return user

    }


    getUserByEmail = async (email) => {

        const findUser = await userModel.findOne(email);

        return findUser


    }

    userById = async (id) => {

        const findUser = await userModel
            .findById(id)
            .populate("carts.cart")
            .lean();

        return findUser

    }

    // Agregar el user al cartID

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


const UserService = new UserServices();

export default UserService;