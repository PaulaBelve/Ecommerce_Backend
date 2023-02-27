import { cartManager } from "../dao/managers/index.js";
import MyRouter from "./router.js"


export default class CartsRouter extends MyRouter {

    init() {

        // Vista del carrito

        this.get('/', async (req, res) => {
            try {

                const cart = await cartManager.getCarts()



                return res.sendSuccess({ cart })


            } catch (error) {

                console.log(error)
                return res.sendServerError({ error: error.message })




            }

        })

        // Agregar un carrito

        this.post('/', async (req, res) => {

            try {

                const result = await cartManager.createCart()
                return res.sendSuccess({ result })

            } catch (error) {

                console.log(error)
                return res.sendServerError({ error: error.message })



            }

        })

        // Muestra un carrito determinado con su producto
        this.get('/:cid', async (req, res) => {

            try {
                const { cid } = req.params

                const result = await cartManager.getCartsById(cid);


                if (!result) {

                    return res.send({ succes: false, error: 'NOT FOUND CART' });

                };

                return res.sendSuccess({ result })


            } catch (error) {
                console.log(error)

                return res.sendServerError({ error: error.message })

            };

        });

        // Agregar un producto en el carrito

        this.post('/:cid/product/:pid', async (req, res) => {

            try {

                const { cid, pid } = req.params

                const result = await cartManager.addCart(cid, pid)

                return res.sendSuccess({ result })


            } catch (error) {

                console.log(error)

                return res.sendServerError({ error: error.message })

            }
        })

        // Eliminar del carrito el producto seleccionado

        this.delete('/:cid/product/:pid', async (req, res) => {

            try {

                const { cid, pid } = req.params

                const result = await cartManager.deleteProductToCart(cid, pid)

                return res.sendSuccess({ result })



            } catch (error) {

                console.log(error)

                return res.sendServerError({ error: error.message })

            }

        })

        // Agregar al carrito un array de productos

        this.put('/:cid', async (req, res) => {

            try {

                const { cid } = req.params

                const { products } = req.body

                console.log(products)

                const result = await cartManager.arrayProduct(

                    cid,
                    products)

                return res.sendSuccess({ result })



            } catch (error) {

                console.log(error)

                return res.sendServerError({ error: error.message })

            }

        })

        // Actualizar la cantidad de un producto

        this.put('/:cid/product/:pid', async (req, res) => {


            try {

                const { quantity } = req.body

                const { cid, pid } = req.params

                const result = await cartManager.updateQuantityProduct(
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



        })

        this.delete('/:cid', async (req, res) => {

            try {

                const { cid } = req.params

                const result = await cartManager.emptyCart(cid)

                return res.sendSuccess({ result })



            } catch (error) {

                console.log(error)

                return res.sendServerError({ error: error.message })

            }



        })

    }
}











