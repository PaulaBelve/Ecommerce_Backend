import mongoose from "mongoose";
//import { productModel } from "../dao/models/products.model.js";

// Nombre de la colección
const messageCollection = 'message'

// Como se guardan los datos en esta colección // Esquema del documento

const messageSchema = new mongoose.Schema({

     User: String,
     Message: String,
  


})

// Creación del model : collection + schema 

 export const messageModel = mongoose.model(messageCollection, messageSchema)