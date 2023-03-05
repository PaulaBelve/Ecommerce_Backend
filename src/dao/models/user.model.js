import mongoose from "mongoose";


// Nombre de la colección

const userCollection = 'users'


const userSchema = new mongoose.Schema({

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
        default: "user",
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



// Creación del model : collection + schema 

export const userModel = mongoose.model(userCollection, userSchema)