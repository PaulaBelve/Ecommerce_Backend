import ProductsService from "../services/products.service.js";

export default class ProductsController {

    constructor() {

        this.productsService = new ProductsService();
    }

    getAllProductsCtr = async (req, res) => {

        try {

            const { sort, query, page, limit } = req.query;

            const options = {

                limit: limit || 5,
                page: page || 1,
                sort: { price: sort } || { price: 1 },
                lean: true,
            };

            const products = await this.productsService.getAllProducts(query, options);


            res.send({
                status: "success",
                payload: products.docs,
                totalPages: products.totalPages,
                prevPage: products.prevPage,
                nextPage: products.nextPage,
                page: products.page,
                hasPrevPage: products.hasPrevPage,
                hasNextPage: products.hasNextPage,
                prevLink: products.hasPrevPage
                    ? `/api/products?page=${products.prevPage}`
                    : null,
                nextLink: products.hasNextPage
                    ? `/api/products?page=${products.nextPage}`
                    : null,

            })


        } catch (error) {

            res.sendServerError(error)
            console.log(error)


        }

    }

    // Traer un solo producto por id

    getProductByIdCtr = async (req, res) => {

        try {

            const { pid } = req.params

            const product = await this.productsService.getProductById(pid)


            res.send({
                status: "succes",
                payload: product
            })


        } catch (error) {

            res.sendServerError(error)


        }

    }

    // Agregar un producto

    addNewProductCtr = async (req, res) => {

        try {

            const newProduct = req.body

            if (!newProduct) {

                return res.send({
                    status: "error",
                    error: "EMPTY PRODUCT",
                });
            }

            const result = await this.productsService.addNewProduct(newProduct)

            res.sendSuccess({ result });

        } catch (error) {

            res.sendServerError({ error: error.message });



        }
    }


    // Actualizar un producto

    updateProductCtr = async (req, res) => {

        try {

            const { pid } = req.params

            const productToReplace = req.body

            const result = await this.productsService.updateProduct(pid, productToReplace)

            res.sendSuccess({ result });

        } catch (error) {

            res.sendServerError({ error: error.message });

        }


    }

    // Eliminar un producto

    deleteProductCtr = async (req, res) => {
        try {

            const { pid } = req.params

            const result = await this.productsService.deleteProduct(pid)

            return res.sendSuccess({ result });

        } catch (error) {

            return res.sendServerError({ error: error.message });
        }
    }


}
