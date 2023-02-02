import mongoose from "mongoose";

const Schema = mongoose.Schema;


// Nombre de la colección
const cartsCollection = 'carts';

// Como se guardan los datos en esta colección // Esquema del documento

//const cartSchema = new Schema({

const cartSchema = new Schema({
     products: [
          {
               product: { type: Schema.Types.ObjectId, ref: "products" },
               quantity: {
                    type: Number,
                    default: 1,

               },
          },
     ],

     default: []

});
//   })        

// Creación del model : collection + schema 

export const cartsModel = mongoose.model(cartsCollection, cartSchema)