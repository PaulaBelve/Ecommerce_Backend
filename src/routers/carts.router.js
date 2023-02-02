import { Router } from "express";
import { cartManager } from "../dao/managers/index.js";

const router = Router()

// MANAGER

// Vista del carrito

router.get('/', async (req, res) => {
    try {

        const cart = await cartManager.getCarts()

        res.send({
            status: "success",
            payload: cart
        })


    } catch (error) {

        console.log(error)
        return res.send({ success: "error", error: 'No se pueden mostrar los productos!' })



    }

})

// Agregar un carrito

router.post('/', async (req, res) => {

    try {

        const result = await cartManager.createCart()
        res.send({
            status: "success",
            payload: result
        })

    } catch (error) {

        console.log(error)
        return res.send({ success: false, error: 'error!' })



    }

})

// Muestra un carrito determinado con su producto
router.get('/:cid', async (req, res) => {

    try {
        const { cid } = req.params

        const result = await cartManager.getCartsById(cid);


        if (!result) {

            return res.send({ succes: false, error: 'NOT FOUND CART' });

        };

        res.send({
            status: "success",
            payload: result
        })


    } catch (error) {
        console.log(error)

        res.send({ succes: false, error: 'error!' })

    };

});

// Agregar un producto en el carrito

router.post('/:cid/product/:pid', async (req, res) => {

    try {

        const { cid, pid } = req.params

        const result = await cartManager.addCart(cid, pid)

        res.send({
            status: "success",
            payload: result,
        })


    } catch (error) {

        console.log(error)

        res.send({ succes: false, error: 'El producto ya fue agregado al carrito!' })

    }
})

// Eliminar del carrito el producto seleccionado

router.delete('/:cid/product/:pid', async (req, res) => {

    try {

        const { cid, pid } = req.params

        const result = await cartManager.deleteProductToCart(cid, pid)

        res.send({
            status: "success",
            payload: result,
        })



    } catch (error) {

        console.log(error)

        res.send({ status: false, error: 'El producto no pudo ser eliminado!' })

    }

})

// Agregar al carrito un array de productos

router.put('/:cid', async (req, res) => {

    try {

        const { cid } = req.params

        const { products } = req.body

        console.log(products)

        const result = await cartManager.arrayProduct(

            cid,
            products)

        res.send({
            status: "success",
            payload: result,
        })



    } catch (error) {

        console.log(error)

        res.send({ status: false, error: 'No se pudo agregar al carrito!' })

    }

})

// Actualizar la cantidad de un producto

router.put('/:cid/product/:pid', async (req, res) => {


    try {

        const { quantity } = req.body

        const { cid, pid } = req.params

        const result = await cartManager.updateQuantityProduct(
            quantity ?? 1,
            cid,
            pid
        )


        res.send({
            status: "success",
            payload: result,
        })

        console.log(result)

    } catch (error) {

        console.log(error)

        res.send({ succes: false, error: 'No se pudo actualizar el carrito!' })

    }



})

router.delete('/:cid', async (req, res) => {

    try {

        const { cid } = req.params

        const result = await cartManager.emptyCart(cid)

        res.send({
            status: "success",
            payload: result,
        })



    } catch (error) {

        console.log(error)

        res.send({ succes: false, error: 'error!' })

    }



})


export default router









