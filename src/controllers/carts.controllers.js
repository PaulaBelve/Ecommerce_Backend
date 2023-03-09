import CartsService from "../services/carts.service.js";


export default class cartControllers {

    constructor() {

        this.cartsService = new CartsService();
    }

    // Crea un nuevo carrito

    createCart = async (req, res) => {

        try {

            const result = await this.cartsService.createCart()
            return res.sendSuccess({ result })

        } catch (error) {

            console.log(error)
            return res.sendServerError({ error: error.message })



        }
    }

    // Vista de los carritos

    getAllCarts = async (req, res) => {

        try {

            const cart = await this.cartsService.getCarts()



            return res.sendSuccess({ cart })


        } catch (error) {

            console.log(error)
            return res.sendServerError({ error: error.message })




        }

    }

    // Vista x cid

    getCartById = async (req, res) => {


        try {
            const { cid } = req.params

            const result = await this.cartsService.getCartsById(cid);


            if (!result) {

                return res.send({ succes: false, error: 'NOT FOUND CART' });

            };

            return res.sendSuccess({ result })


        } catch (error) {
            console.log(error)

            return res.sendServerError({ error: error.message })

        };



    }

    //Agregar un producto al carrito

    addProductToCart = async (req, res) => {


        try {

            const { cid, pid } = req.params

            const result = await this.cartsService.addCart(cid, pid)

            return res.sendSuccess({ result })


        } catch (error) {

            console.log(error)

            return res.sendServerError({ error: error.message })

        }
    }

    // Actualizar la cantidad de un producto en el carrito

    updateProductQuantity = async (req, res) => {

        try {

            const { quantity } = req.body

            const { cid, pid } = req.params

            const result = await this.cartsService.updateQuantityProduct(
                quantity ?? 1,
                cid,
                pid
            )

            console.log(result)

            return res.sendSuccess({ result })



        } catch (error) {

            console.log(error)

            return res.sendServerError({ error: error.message })

        }
    }

    //Agregar un array al carrito

    addArrayOfProducts = async (req, res) => {

        try {
            const { cid } = req.params

            const { products } = req.body

            console.log(products)

            const result = await this.cartsService.arrayProduct(

                cid,
                products)

            return res.sendSuccess({ result })



        } catch (error) {

            console.log(error)

            return res.sendServerError({ error: error.message })

        }




    }

    // Eliminar un producto

    deleteOneProduct = async (req, res) => {

        try {

            const { cid, pid } = req.params

            const result = await this.cartsService.deleteProductToCart(cid, pid)

            return res.sendSuccess({ result })



        } catch (error) {

            console.log(error)

            return res.sendServerError({ error: error.message })

        }




    }

    // Vaciar el carrito

    emptyCart = async (req, res) => {


        try {

            const { cid } = req.params

            const result = await this.cartsService.emptyCart(cid)

            return res.sendSuccess({ result })



        } catch (error) {

            console.log(error)

            return res.sendServerError({ error: error.message })

        }

    }

    purchaseCart = async (req, res) => {

        try {
            const { cid } = req.params;

            const result = await this.cartsServices.purchaseProducts(cid);

            return res.sendSuccess({ result })
        } catch (error) {
            console.log(error);

            return res.sendServerError({ error: error.message })
        }

    }











}