import bcrypt from "bcrypt"

//encriptar la contraseña
export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (user, password) => {

    return bcrypt.compareSync(password, user.password)
};