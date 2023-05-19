import CartsService from "./carts.service.js";
import tokenModel from "../dao/models/tocken.model.js";
import userModel from "../dao/models/user.model.js";
import sendMail from "../nodemailer.js";
import sendMailDelete from "../nodemailerDelete.js"
import { generateCode } from "../utils.js"
import { generateToken } from "../utils/jwt.js";
import UserDto from "../dao/DTO/users.dto.js";
import dotenv from "dotenv";

dotenv.config();

const cartsService = new CartsService();

class UserServices {

    // Mostrar todos los usuarios

    getAllUsers = async () => {


        const users = await userModel.find().lean().exec();

        const mapedUser = users.map((user) => new UserDto(user));
        console.log(mapedUser)

        return mapedUser;

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

            /*    if (result.email === 'adminCoder@coder.com') {
                    result.role = 'ADMIN';
                    await result.save();
                    return done(null, result);
                } */

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

            const isValidPassword = await userModel.comparePassword(
                password,
                user.password
            );

            if (!isValidPassword) {

                console.log('password incorrect')


                return done(null, false)
            }

            const dtoUser = new UserDto(user);

            const token = generateToken(dtoUser);
            dtoUser.token = token;



            this.updateLoginDate(user._id);

            return done(null, dtoUser)


        } catch (error) {


            req.logger.error(error)

            return done('Hubo un error en el login')


        }


    }

    updateLoginDate = async (id) => {

        return await userModel.findByIdAndUpdate(
            { _id: id },

            {
                $set: { last_connection: Date.now() },
            },

            { new: true }


        )

    }

    //ACTUALIZAR PARA QUE INCLUYA LOS DOCUMENTOS QUE SUBE EL USUARIO PREMIUM

    /*   changeRole = async (uid) => {
           try {
               const user = await this.findUserById(uid);
   
               if (!user) {
                   CustomError.createError({
                       name: ERRORS_ENUM["USER NOT FOUND"],
                       message: ERRORS_ENUM["USER NOT FOUND"],
                   });
               }
   
               if (user?.role === "USER") {
                   const userDocuments = user?.documents.map((document) => {
                       console.log(document);
   
                       if (!document) {
                           CustomError.createError({
                               name: "DOCUMENT NOT FOUND",
                               message: "YOU DONT HAVE ANY DOCUMENT UPLOADED",
                           });
                       }
   
                       const result = path.parse(document.name).name;
   
                       console.log(result);
   
                       return result;
                   });
   
                   console.log(userDocuments);
   
                   if (
                       !userDocuments?.includes("identificación") &&
                       !userDocuments?.includes("comprobante de domicilio") &&
                       !userDocuments?.includes("comprobante de estado de cuenta")
                   ) {
                       CustomError.createError({
                           name: "Invalid Credentials",
                           message: "Must upload ",
                       });
   
                       return false;
                   }
               }
   
               const result = await userModel.updateOne(
                   { _id: uid },
                   { role: user?.role === "USER" ? "PREMIUM" : "USER" }
               );
   
               if (!result) return false;
   
               return true;
           } catch (error) {
               console.log(error);
               return error;
           }
       }; */



    // ChangeRole sin agregar documentos

    changeRole = async (uid) => {
        try {
            const user = await this.findUserById(uid);

            if (!user) {
                CustomError.createError({
                    message: ERRORS_ENUM["USER NOT FOUND"],
                });
            }

            console.log(user);

            const result = await userModel.updateOne(
                { _id: uid },
                { role: user.role === "USER" ? "PREMIUM" : "USER" }
            );

            if (!result) return false;

            return true;
        } catch (error) {
            console.log(error);
        }
    };


    sendRestoreMail = async (email) => {

        const user = await this.getUser(email);

        if (!user) {

            CustomError.createError({
                message: "User with given email doesn't exist",
            });
        }

        let token = await tokenModel.findOne({ userId: user._id })

        if (!token) {

            token = await new tokenModel({
                userId: user._id,
                token: generateCode(),
            }).save()

        }

        const link = `${process.env.BASE_URL}/restoreForm/${user._id}/${token.token}`;

        console.log(link)

        await sendMail.send(user.email, "Password Reset", link)

        return true;

    }

    restorePassword = async (uid, password, token) => {

        const user = await this.findUserById(uid);

        if (!user) {

            CustomError.createError({
                message: ERRORS_ENUM["USER NOT FOUND"],
            });

            return;
        }

        const userToken = await this.findUserToken(uid);

        if (!userToken) {

            CustomError.createError({
                message: "Invalid or expired token",
            });

            return;
        }

        const isValidPassword = await userModel.comparePassword(

            password,
            user.password)


        if (isValidPassword) {

            CustomError.createError({
                message: "Can not use the last password, must be a new one",
            });

            return;
        }

        const result = await userModel.updateOne(

            { _id: uid },
            { password: await userModel.encryptPassword(password) }


        )

        if (!result) {
            return false;

        }

        await userToken.delete();

        return true

    }


    findUserById = async (uid) => {

        const user = await userModel.findById({ _id: uid }).lean().exec();

        if (!user) {
            CustomError.createError({
                message: ERRORS_ENUM["USER NOT FOUND"],
            });
        }

        return user;

    }

    findUserToken = async (uid, token) => {

        const userToken = await tokenModel.findOne({ userId: uid })

        return userToken


    }

    deleteToken = async (uid) => {

        const usertoken = await tokenModel.deleteOne({ userId: uid })

        return usertoken;


    }

    //Se eliminar los usuarios que hayan estado inactivos 30min

    deleteUserInactivity = async (email) => {


        //Obtener todos los usuarios

        const users = await userModel.find({})

        users.forEach(async (user) => {

            // Verificar si el usuario no ha iniciado sesión en los últimos 30 minutos

            const lastConnection = user.last_connection;

            const cutoffTime = new Date(Date.now() - 30 * 60 * 1000);

            if (lastConnection < cutoffTime) {

                // Eliminar los usuarios

                const deleteUsers = await userModel.deleteOne({ _id: user._id });

                console.log(deleteUsers)

                // Enviar correo electrónico al usuario eliminado

                const linkMessageInactivityUser = `${process.env.BASE_URL}/register`;

                console.log(linkMessageInactivityUser);

                // await sendMailDelete.sendDelete

                await sendMailDelete.sendDelete(

                    user.email,

                    "Caducidad de la cuenta",


                    linkMessageInactivityUser

                );

            }

        });

        return true;

    };


    /*  updateUpload = async (uid, newDocument) => {
  
          const user = await userModel.findById({ _id: uid }).lean().exec();
  
          if (!user) {
              CustomError.createError({
                  name: ERRORS_ENUM["USER NOT FOUND"],
                  message: ERRORS_ENUM["USER NOT FOUND"],
              });
  
              return;
          }
  
          return await userModel.updateOne(
  
              { _id: uid },
              { $push: { documents: newDocument } }
  
          );
      } */



}

const UserService = new UserServices();

export default UserService;














