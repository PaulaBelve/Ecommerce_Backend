import passport from "passport";
import local from "passport-local";
import GitHubStrategy from 'passport-github2';
import { usersManager } from "../dao/managers/index.js";
import { userModel } from "../dao/models/user.model.js";
import { createHash, isValidPassword } from "../utils/utils.js";


const localStrategy = local.Strategy

const initializePassport = () => {

    passport.use('gitHub', new GitHubStrategy(
        {
            clientID: "Iv1.1f67dc2b0a006359",
            clientSecret: "8f25918d79cb04e315903d30f25533eb305bfae4",
            callBackUrl: "http://localhost:8080/session/githubcallback",
        },
        async (accessToken, refreshToken, profile, done) => {

            console.log(profile)
            try {

                const user = await userModel.findOne({ email: profile._json.email })

                if (user) {

                    console.log('User already exist');
                    return done(null, user)
                }

                const newUser = {

                    first_name: "",
                    last_name: "",
                    email: profile._json.name,
                    password: ""

                };

                const result = new userModel(newUser);
                return done(null, result);


            } catch (error) {

                return done('Error to login width GitHub' + error)

            }
        }


    ))

    passport.use('register', new localStrategy(

        {
            passReqToCallback: true, usernameField: 'email'
        },

        async (req, username, password, done) => {

            const { first_name, last_name, email } = req.body

            try {
                //const user = await usersManager.userLogin({ email: username })
                const user = await userModel.findOne({ email: username })
                if (user) {

                    console.log('user al ready exist');
                    return done(null, false)
                }

                const newUser = {

                    first_name,
                    last_name,
                    email,
                    password: createHash(password)

                }
                // PROBAR
                // No me esta tomando el rol del admin
                const result = new userModel(newUser);

                if (result.email === 'adminCoder@coder.com') {
                    result.role = 'admin';
                    await result.save();
                    return done(null, result);
                }

                await result.save();
                return done(null, result);



                /*    const result = await usersManager.userCreate(newUser)
    
                    if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
                        req.session.user = {
                            first_name: "admin",
                        };
    
                        req.session.user.role = "admin";
    
    
                    }
    
                    return done(null, result)*/

            } catch (error) {

                return done('Error to Register' + error)
            }
        }


    ))

    passport.use('login', new localStrategy(

        { usernameField: 'email' },

        async (username, password, done) => {

            try {
                //const user = await usersManager.userLogin({ username, email, password })
                const user = await userModel.findOne({ email: username }).lean().exec()

                if (!user) {

                    console.log('User dosnt exist');
                    return done(null, false)
                }

                if (!isValidPassword(user, password)) return done(null, false)

                return done(null, user)


            } catch (error) {

                return done('Hubo un error en el login')


            }




        }





    ))

    // Serializar - Deserializar
    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        const user = await usersManager.getUserById(id)
        done(null, user)
    })

}

export default initializePassport
