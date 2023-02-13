import mongoose from "mongoose";
//import mongoosePaginate from "mongoose-paginate-v2";

// Nombre de la colección
const userCollection = 'users'

// Como se guardan los datos en esta colección // Esquema del documento

const userSchema = new mongoose.Schema({

    first_name: String,
    last_name: String,
    zona: String,
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

})



//userSchema.plugin(mongoosePaginate);

// Creación del model : collection + schema 

export const userModel = mongoose.model(userCollection, userSchema)