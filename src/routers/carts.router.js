import { Router } from "express";
import { cartManager } from "../dao/managers/index.js";

const router = Router()

// MANAGER

// Vista del carrito

router.get ('/', async (req, res) => {
try {

const cart = await cartManager.getCarts()

res.send({ status: "succes",
    payload: cart })


} catch (error) {

console.log(error)
return res.send({ success: false, error: 'error!' })



}

})

// Agregar un carrito

router.post ('/', async (req, res) => {

try {

const result = await cartManager.createCart()
res.send({ status: "succes",
    payload: result })

} catch(error) {

    console.log(error)
    return res.send({ success: false, error: 'error!' })



}

})

// Muestra un carrito determinado con su producto
router.get('/:cid', async (req, res) => {

    try {
        const { cid } = req.params

        const result = await cartManager.getCartsById({ _id: cid });


        if (!result) {

            return res.send({ succes: false, error: 'NOT FOUND CART' });

        };

       res.send({ succes: true, payload: result, })


    } catch (error) {
        console.log(error)

         res.send({ succes: false, error: 'error!' })

    };

});

// Agregar un producto en el carrito

router.post ('/:cid/products/:pid' , async (req, res) => {

try {

    const {cid, pid} = req.params

    const result = await cartManager.addCart(cid, pid)

    res.send({ status: "succes", 
        payload: result, })


} catch (error) {

    console.log(error)

    res.send({ succes: false, error: 'error!' })

} })

// Eliminar del carrito el producto seleccionado

router.delete ('/:cid/product/:pid', async (req, res) => {

try {

    const {cid, pid} = req.params

    const result = await cartManager.deleteProductToCart(cid, pid)

    res.send({ status: "succes", 
        payload: result, }) 



} catch (error) {

    console.log (error)

    res.send({ succes: false, error: 'error!' })

}

})

// Agregar al carrito un array de productos

router.put ('/:cid' , async (req, res) => {

try {

    const {cid} = req.params

    const products = req.body

    const result = await cartManager.arrayProduct(
        
        cid,
        products)

    res.send({ status: "succes", 
        payload: result, })  



} catch (error) {

    console.log (error)

    res.send({ succes: false, error: 'error!' })

}

})

// Actualizar la cantidad de un producto

router.put ('/:cid/product/:pid' , async (req, res) => {


    try {

        const {quantity} = req.body
        
        const {cid, pid} = req.params
    
        const result = await cartManager.updateQuantityProduct(
            quantity,
            cid,
            pid
            )
    
        res.send({ status: "succes", 
            payload: result, })  
    
    
    
    } catch (error) {
    
        console.log (error)
    
        res.send({ succes: false, error: 'error!' })
    
    }



})

router.delete ('/:cid', async (req, res) => {

    try {

        const {cid} = req.params
    
        const result = await cartManager.emptyCart(cid)
    
        res.send({ status: "succes", 
            payload: result, }) 
    
    
    
    } catch (error) {
    
        console.log (error)
    
        res.send({ succes: false, error: 'error!' })
    
    }
    


})


export default router








// MONGOOSE

// Vista del carrito

/*router.get('/', async (req, res) => {

    try {
   

        const carts = await cartsModel.find()

        console.log(carts)

        res.send(carts)



    } catch (error) {
        console.log(error)

        return res.send({ success: false, error: 'error!' })

    };

}); */

// Agregar carrito

/*router.post('/', async (req, res) => {

    try {

        const newCart = {

            products: []
        };

        const result = await cartsModel.create(newCart)

        res.send({
            succes: true,
            payload: result,

        })

    } catch (error) {

        console.log('error')

        return res.send({ succes: false, Error: 'Ha ocurrido un error' })


    }

}) */

// Agregar carrito con su producto

/*router.get('/:cid', async (req, res) => {

    try {
        const { cid } = req.params

        if (!cid) {

            return res.send({ succes: false, error: 'ingresar un número valido' });
        };

        const result = await cartsModel.findById({ _id: cid });


        if (!result) {

            return res.send({ succes: false, error: 'ingresar un número valido' });

        };

        return res.send({ succes: true, payload: result, })


    } catch (error) {
        console.log(error)

        return res.send({ succes: false, error: 'error!' })

    };

}); */

// MANAGER SIN MONGODB

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

