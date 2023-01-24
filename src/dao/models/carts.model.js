import mongoose from "mongoose";
//import { productModel } from "../dao/models/products.model.js";

// Nombre de la colección
const cartsCollection = 'carts'

// Como se guardan los datos en esta colección // Esquema del documento

const cartSchema = new mongoose.Schema({

     cart: {

          type: [

               {
                    product: {

                         id: {
                              type: mongoose.Schema.Types.ObjectId,
                              ref: 'products'
                         },
                         quantity: {
                              type: Number,

                              default: 1,
                         }
                    }

               }

               

          ],
          
          default: [],
     },

});

// Creación del model : collection + schema 

export const cartsModel = mongoose.model(cartsCollection, cartSchema)