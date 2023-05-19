//import { error } from "winston";
import { productModel } from "../dao/models/products.model.js";
import sendMailDeletePremium from "../nodemailerDelete.js"

export default class ProductsService {


    // Mostrar todos los productos con paginación

    getAllProducts = async (query, options) => {

        if (query === "inStock") {
            const products = await productModel.paginate({ state: true },

                options);

            if (!products) {

                throw new ValidationError('NOT FOUND DB')
            }
            return products
        }

        if (query === "cacao" ||
            query === "citricos" ||
            query === "frutales" ||
            query === "secos"

        ) {
            const products = await productModel.paginate(

                { category: query },

                options
            );

            if (!products) {

                throw new Error('NOT FOUND DB')
            }

            return products
        }

        const products = await productModel.paginate({}, options)

        if (!products) {

            throw new ValidationError('NOT FOUND DB')
        }

        return products



    }


    // Traer un producto por id

    getProductById = async (pid) => {


        const product = await productModel.findById({ _id: pid }).lean();

        if (!product) {

            throw new Error('PRODUCT NOT FOUND')

        }

        return product


    }

    // Agregar productos

    addNewProduct = async (newProduct, user) => {

        const product = await productModel.findOne({ code: newProduct.code });

        if (product) {

            throw new Error('Product Already Exist in DB')


        }

        //probar esto

        const result = await productModel.create({
            ...newProduct,
            //owner: user ? user._id : "ADMIN",
            owner: user
        })


        return result
    }

    // Actualizar un producto

    updateProduct = async (pid, updateProduct) => {

        const product = await this.getProductById(pid);


        if (!product) {

            throw new Error('PRODUCT NOT FOUND')
        }

        const result = await productModel.updateOne(

            { _id: pid },

            updateProduct);

        return result

    }

    // Eliminar un producto

    deleteProduct = async (pid, user) => {

        const product = await this.getProductById(pid);

        //TODO el owner dentro del prodcuto se guarda como un objeto

        if (!product) {

            CustomError.createError({
                name: ERRORS_ENUM["PRODUCT NOT FOUND"],
                message: ERRORS_ENUM["PRODUCT NOT FOUND"],
            });

            return;
        }

        if (product.owner !== "ADMIN" && product.owner != user) {

            CustomError.createError({
                name: ERRORS_ENUM["INVALID USER"],
                message: ERRORS_ENUM["INVALID USER"],
            });

            return;
        }


        //Elimina el producto de un usuario PREMIUM de la base de datos

        const deleteProduct = await productModel.deleteOne(

            { _id: pid },

            user)

        // Verifica si el usuario es PREMIUM

        //deleteProduct en el if?

        if (product.owner === user && user.PREMIUM) {



            await sendMailDeletePremium.sendDeletePremium(

                //user.role,

                product.owner,

                "Producto eliminado",

                "Uno de los productos de tu colección ha sido eliminado"


            );


        }

        return deleteProduct

    }

    //actualizar stock

    updateStock = async (pid, quantity) => {

        const product = await this.getProductById(pid);

        if (product.stock < quantity) {
            console.log("No stock");

            return false;
        }

        await productModel.updateOne(
            { _id: pid },
            { $inc: { stock: -quantity } }
        );

        return true;

    };
}