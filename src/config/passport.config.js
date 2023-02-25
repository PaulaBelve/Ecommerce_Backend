import passport from "passport";
import local from "passport-local";
import jwt from 'passport-jwt';
import GitHubStrategy from 'passport-github2';
import { usersManager } from "../dao/managers/index.js";
import { userModel } from "../dao/models/user.model.js";
import { createHash, isValidPassword, generateToken } from "../utils/utils.js";
import credentials from "./credentials.js"


const localStrategy = local.Strategy;

const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const cookieExtractor = req => {
    const token = (req && req.cookies) ? req.cookies[credentials.COOKIE_NAME] : null;

    return token;
}



const initializePassport = () => {

    passport.use('gitHub', new GitHubStrategy(
        {
            clientID: "Iv1.1f67dc2b0a006359",
            clientSecret: "8f25918d79cb04e315903d30f25533eb305bfae4",
            callBackUrl: "http://localhost:8080/session/githubcallback",
            scope: ["users:email"],
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

                    first_name: "", //profile._json.name,
                    last_name: "",
                    email: profile._json.email,//profile.emails[0].values,
                    social: 'GitHub',
                    password: ""

                };

                //const result = new userModel(newUser);

                const result = usersManager.userCreate(newUser)

                return done(null, result);


            } catch (error) {

                return done('Error to login width GitHub' + error)

            }
        }


    ))

    passport.use(
        'register', new localStrategy(

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

                    const result = new userModel(newUser);

                    if (result.email === 'adminCoder@coder.com') {
                        result.role = 'admin';
                        await result.save();
                        return done(null, result);
                    }

                    await result.save();
                    return done(null, result);




                } catch (error) {

                    return done('Error to Register' + error)
                }
            }


        ))

    passport.use('login', new localStrategy(

        { usernameField: 'email' },

        async (username, password, done) => {

            try {

                const user = await userModel
                    .findOne({ email: username })
                    .lean()
                    .exec()

                if (!user) {

                    console.log('User dosnt exist');
                    return done(null, false)
                }

                if (!isValidPassword(user, password)) { return done(null, false) }

                const token = generateToken(user);
                user.token = token;

                return done(null, user)


            } catch (error) {

                return done('Hubo un error en el login')


            }
        }

    ))

    // JWT Passport Strategy

    passport.use('jwt', new JWTStrategy({

        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: credentials.PRIVATE_KEY,

    }, async (jwt_payload, done) => {
        try {

            return done(null, jwt_payload);

        } catch (error) {

            return done(error)

        }



    }))

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
