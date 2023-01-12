import { Router } from "express";
//import { cartManager } from "../dao/index.js";
import { cartsModel } from "../dao/models/carts.model.js";
import { productModel } from "../dao/models/products.model.js";

const router = Router()

// MONGOOSE

// Vista del carrito

router.get('/', async (req, res) => {

    try {
        //  const { cid } = req.params

        const carts = await cartsModel.find()

        console.log(carts)

        res.send(carts)



    } catch (error) {
        console.log(error)

        return res.send({ success: false, error: 'error!' })

    };

});

// Agregar carrito

router.post('/', async (req, res) => {

    try {

        const newCart = {

            products: []
        };


        //  return res.send({ succes: true, Cart: newCart })
        const result = await cartsModel.create(newCart)

        res.send({
            succes: true,
            payload: result,

        })

    } catch (error) {

        console.log('error')

        return res.send({ succes: false, Error: 'Ha ocurrido un error' })


    }

})

// Agregar los productos al carrito

router.post('/:cid/products/:pid', async (req, res) => {

    try {
        const { cid } = req.params

        const cartId = Number(cid)


        if (Number.isNaN(cartId) || cartId < 0) {

            return res.send({ succes: false, error: 'ingresar un número valido' })
        }

        const { pid } = req.params

        const prodId = Number(pid)


        if (Number.isNaN(prodId) || prodId < 0) {

            return res.send({ succes: false, error: 'ingresar un número valido' })
        }

        const addproduct = await cartManager.addCart(cartId, prodId)

        return res.send({ succes: true, product: addproduct })


    } catch (error) {
        console.log(error)

        return res.send({ succes: false, error: 'error!' })

    };

});

// MANAGER

/*router.get('/:cid', async (req, res) => {

    try {
        const { cid } = req.params

        const id = Number(cid)


        if (Number.isNaN(id) || id < 0) {

            return res.send({ succes: false, error: 'ingresar un número valido. Por favor, ingresar de nuevo' })
        }

        const idCarrito = await cartManager.getCartsById(id)

        return res.send({ success: true, Cart: idCarrito })

    } catch (error) {
        console.log('error')

        return res.send({ success: false, error: 'error!' })

    };

});

router.post('/', async (req, res) => {

    try {

        const newCart = await cartManager.crearElCarrito();

        return res.send({ succes: true, Cart: newCart })

    }

    catch (error) {

        console.log('error')

        return res.send({ succes: false, Error: 'Ha ocurrido un error' })


    }

})

router.post('/:cid/products/:pid', async (req, res) => {

    try {
        const { cid } = req.params

        const cartId = Number(cid)


        if (Number.isNaN(cartId) || cartId < 0) {

            return res.send({ succes: false, error: 'ingresar un número valido' })
        }

        const { pid } = req.params

        const prodId = Number(pid)


        if (Number.isNaN(prodId) || prodId < 0) {

            return res.send({ succes: false, error: 'ingresar un número valido' })
        }

        const addproduct = await cartManager.addCart(cartId, prodId)

        return res.send({ succes: true, product: addproduct })


    } catch (error) {
        console.log(error)

        return res.send({ succes: false, error: 'error!' })

    };

}); */

export default router