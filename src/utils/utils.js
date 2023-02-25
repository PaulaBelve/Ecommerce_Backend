import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import passport from 'passport';
import credentials from "../config/credentials.js";

//encriptar la contraseña
export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (user, password) => {

    return bcrypt.compareSync(password, user.password)
};

//Llave para generar el Token
export const generateToken = user => {
    return jwt.sign({ user }, credentials.PRIVATE_KEY, { expiresIn: '24h' })

}

export const authToken = (req, res, next) => {

    const authToken = req.cookies.delfosCookieToken

    if (!authToken) return res.status(401).render('errors', { error: 'No aAuth' })

    jwt.verify(token, credentials.PRIVATE_KEY, (error, credentials) => {
        if (error) return res.status(403).render('/errors', { error: 'No authorized' })
        req.user = credentials.user
        next()
    })


}

export const passportCall = (Strategy) => {

    return async (req, res, next) => {
        passport.authenticate(Strategy, function (err, user, info) {
            if (err) return next(err)
            if (!user) return res.status(401).render('/errors', { error: info.messages ? info.messages : info.toString() })

            req.user = user
            next()
        })(req, res, next)
    }
}



