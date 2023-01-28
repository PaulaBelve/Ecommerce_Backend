import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

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
    status: Boolean,
    stock: {
        type: Number,
        index: true,

    },
    category: {
        type: String,
        index: true,

    },


})

mongoosePaginate.paginate.options = {
    limit: 10,
    page: 1,
    sort: { price: 1 },
    lean: true,
};

productSchema.plugin(mongoosePaginate);

// Creación del model : collection + schema 

export const productModel = mongoose.model(productCollection, productSchema)

