import mongoose from "mongoose";
import bcrypt from "bcrypt";


//const userCollection = 'users'

const Schema = mongoose.Schema;


const userSchema = new Schema({

    first_name: String,
    last_name: String,
    zona: String,
    social: String,
    email: {
        type: String,
        //que no se duplique el mail
        unique: true
    },
    password: String,
    role: {
        type: String,
        default: "USER",
    },

    carts: [
        {
            cart: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "carts"
            },

        },
    ],

    default: [],

})

userSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);

    return await bcrypt.hash(password, salt);
};

userSchema.statics.comparePassword = async (password, recivedPassword) => {
    return await bcrypt.compare(password, recivedPassword);
};



const userModel = mongoose.model("users", userSchema);

export default userModel;



// Creación del model : collection + schema

//export const userModel = mongoose.model(userCollection, userSchema)