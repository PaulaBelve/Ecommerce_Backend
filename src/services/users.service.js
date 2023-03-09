import CartsService from "./carts.service.js";
import userModel from "../dao/models/user.model.js";
import { generateToken } from "../utils/jwt.js";
import UserDto from "../dao/DTO/users.dto.js";

const cartsService = new CartsService();

class UserServices {

    // Mostrar todos los usuarios

    getAllUsers = async () => {

        try {
            const users = await userModel.find().lean().exec();

            const mapedUser = users.map((user) => new UserDto(user));

            return mapedUser;
        } catch (error) {
            console.log(error);
        }
    }

    // Encontrar usuario

    getUser = async (data) => {

        try {

            const result = await userModel.findOne({ email: data }).lean().exec()

            const user = new UserDto(result);


            return user

        } catch (error) {

            console.log(error)
        }

    }

registerUser = async (req, username, password, done) => {

    //const { first_name, last_name, email } = req.body

    try {

        const user = await userModel.findOne({ email: username }).lean().exec(); 
        
        if (user) {

            console.log('user al ready exist');
            return done(null, false)
        }

        const newUser = {

            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            zona: req.body.zona,
            password: await userModel.encryptPassword(password),
            cart: await cartsService.createCart(),

        }

       const result = await userModel.create(newUser);

        if (result.email === 'adminCoder@coder.com') {
            result.role = 'ADMIN';
            await result.save();
            return done(null, result);
        }

        await result.save();
        return done(null, result);




    } catch (error) {

        return done('Error to Register' + error)
    }
}

loginUser = async (username, password, done) => {


    try {

        const user = await userModel
            .findOne({ email: username })
            .lean()
            .exec() 



        if (!user) {

            console.log('User not found');
            return done(null, false)
        }

       const isValidPassword = userModel.comparePassword(
            password,
            user.password
          );

          if (!isValidPassword) { 

            console.log ('password incorrect')
            
            return done(null, false) }

        const dtoUser = new UserDto(user);

        const token = generateToken(dtoUser);
        dtoUser.token = token;

        return done(null, dtoUser)


    } catch (error) {

        return done('Hubo un error en el login')


    }


}


userById = async (id) => {

    const findUser = await userModel
        .findById(id)
        .populate("carts.cart")
        .lean();

    return findUser

}



}

const UserService = new UserServices();

export default UserService;


  


    /* getUserByEmail = async (email) => {
 
         const findUser = await userModel.findOne(email);
 
         return findUser
 
 
     */

 

    // Agregar el user al cartID

   /* updateUser = async (userEmail, cid) => {

        const findCart = await userModel.findOne({ "carts.cart": cid });

        if (findCart) {
            const updateCart = await userModel.updateOne({ "carts.cart": cid }, cid);

            return updateCart;
        }

        user.carts.push({ cart: cid });

        const result = await userModel.updateOne({ email: userEmail }, user);

        return result;


    } */





