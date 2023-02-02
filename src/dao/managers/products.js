import { NotFoundError, ValidationError } from "../../utils/index.js";
import { productModel } from "../models/products.model.js";


export class ProductManager {

    // Mostrar todos los productos con paginación

    getProducts = async (query, options) => {

        try {

            if (query === "inStock") {
                const products = await productModel.paginate({ state: true }, options);

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

                    throw new ValidationError('NOT FOUND DB')
                }

                return products
            }

            const products = await productModel.paginate({}, options)

            if (!products) {

                throw new ValidationError('NOT FOUND DB')
            }

            return products

        } catch (error) {

            console.log(error)

            throw new ValidationError('Se ha producido un error')

        }


    }


    // Traer un producto por id

    getProductById = async (pid) => {

        try {
            const product = await productModel.findById({ _id: pid });

            if (!product) {

                throw new ValidationError('PRODUCT NOT FOUND')

            }

            return product
        } catch (error) {

            throw new ValidationError('Se ha producido un error')

        }

    }

    // Agregar productos

    addProduct = async (newProduct) => {

        try {

            if (!newProduct) {

                throw new ValidationError('El código ya existe')


            }

            const result = await productModel.create(newProduct)

            if (!result) {

                throw new ValidationError('FAILED TO ADD TO DATABASE')


            }

            return result

        } catch (error) {

            throw new ValidationError('Se ha producido un error')


        }


    }

    // Actualizar un producto

    updateProduct = async (pid, updateProduct) => {

        try {

            if (!pid) {

                throw new NotFoundError('PRODUCT NOT FOUND')
            }

            const result = await productModel.updateOne(

                { _id: pid },

                updateProduct);

            return result


        } catch (error) {


            throw new NotFoundError('Se ha producido un error')


        }


    }

    // Eliminar un producto

    deleteProduct = async (pid) => {

        try {
            if (!pid) {

                throw new NotFoundError('Producto no encontrado')
            }

            const result = await productModel.deleteOne({ _id: pid })

            return result

        } catch (error) {

            throw new NotFoundError('No se pudo eliminar el producto')


        }

    }

}

