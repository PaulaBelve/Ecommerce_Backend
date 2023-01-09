import mongoose from "mongoose";

// Nombre de la colección
const productCollection = 'products'

// Como se guardan los datos en esta colección // Esquema del documento

const productSchema = new mongoose.Schema({

     title: String,
     id: Number,
    description: String,
    price: Number,
    thumbnail: String,
    code: String,
    stock: Number,
    category: String


})

// Creación del model : collection + schema 

 export const productModel = mongoose.model(productCollection, productSchema)

//export default productModel