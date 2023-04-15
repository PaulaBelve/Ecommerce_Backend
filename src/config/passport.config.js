import passport from "passport";
import local from "passport-local";
import jwt from 'passport-jwt';
import GitHubStrategy from 'passport-github2';
import { generateToken } from "../utils/jwt.js";
import config from "./credentials.js"
import userModel from "../dao/models/user.model.js";
import UserService from "../services/users.service.js";


const localStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;
const { registerUser, loginUser, getUser } = UserService;

const cookieExtractor = req => {
    const token = (req && req.cookies) ? req.cookies[config.COOKIE_NAME] : null;

    return token;
}


const initializePassport = () => {

    passport.use('gitHub', new GitHubStrategy(
        {
            clientID: config.GITHUB_CIENT_ID,
            clientSecret: config.GITHUB_CLIENT_SECRET,
            callBackUrl: config.GITHUB_CALLBACKURL,
            scope: ["users:email"],
        },


        async (accessToken, refreshToken, profile, done) => {

            console.log("Entra", profile);

            try {

                // No reconoce el email

                const user = await getUser(profile._json.email) /*userModel
                    .findOne({
                        email: profile._json.email,  
                    })
                    .lean() */

                if (user) {

                    console.log('User already exist');

                    const token = generateToken(user);

                    return done(null, { ...user, token });
                }

                const newUser = {

                    first_name: profile._json.name,
                    last_name: "",
                    email: profile._json.email, // profile.emails[0].values,
                    social: 'GitHub',
                    password: ""

                };

                const result = await userCreate(newUser)

                const token = generateToken(user);
                result.token = token;

                return done(null, { ...result, token });


            } catch (error) {

                return done('Error to login width GitHub' + error)

            }
        }


    ))

    passport.use(
        'register', new localStrategy(

            {
                passReqToCallback: true,
                usernameField: 'email'
            },

            (req, username, password, done) => registerUser(req, username, password, done)

        )
    );

    passport.use(
        'login', new localStrategy(

            { usernameField: 'email' },

            (username, password, done) => loginUser(username, password, done)
        )
    );

    // JWT Passport Strategy

    passport.use('jwt', new JWTStrategy({

        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: config.PRIVATE_KEY,

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
        //const user = await userById(id)
        const user = await userModel.findById(id);
        done(null, user)
    })

}

export default initializePassport
