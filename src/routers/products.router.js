import { Router } from "express";
import { budines } from "../managers/index.js";
//import { ProductManager } from "../managers/products.js";

const router = Router ()


/*router.get('/', (req, res) => {

res.send('Router Products')

})*/

//Todos los productos 

router.get('/', async (req, res) => {

    try {
        const { limit } = req.query

        const allProducts = await budines.getProducts()

        if (!limit || limit < 1) {

            return res.send({ succes: true, products: allProducts })
        }

        const products = allProducts.slice(0, limit)


        res.send({ succes: true, products })

    } catch (error) {

        console.log("error")

        res.send({ succes: false, error: "ha ocurrido un error" })


    }

})

// Filtrar producto por ID

router.get('/:id', async (req, res) => {

    try {
        const { id: paramId } = req.params

        const id = Number(paramId)


        if (Number.isNaN(id) || id <= 0) {

            return res.send({ succes: false, error: 'ingresar un número valido' })
        }

        const product = await budines.getProductById(id)

        if (!product) {

            return res.send({ succes: false, error: 'el producto no ha sido encontrado' })
        }

        return res.json({ succes: true, product })

    } catch (error) {
        console.log('error')

        res.send({ succes: false, error: 'error!' })

    };

});

// Agregar un producto

router.post('/' , async (req, res) => {

    try {
       
        const {title, description, code, price, stock, category, thumbnails} = req.body


const productoAgregado = {
    
    title: title, 
    description: description,
    code: code, 
    price: price,
    status: true,
    stock: stock,
    category: category, 
    thumbnails: thumbnails

}

    await budines.addProduct ({...productoAgregado})

    res.send ({ succes: true, product: productoAgregado })

    } catch (error) {
       console.log('error')

        res.send({ succes: false, error: 'error!' })

    };

})

// Actualizar un producto

router.put ('/' , async (req, res) => {

    try {


        const {pid} = req.params
        const id = Number(pid)

         if (Number.isNaN(id) || id <= 0) {

            return res.send({ succes: false, error: 'ingresar un número valido' })
        }

       
        const {title, description, code, price, stock, category, thumbnails} = req.body


const forUpdate = {
    
    title: title, 
    description: description,
    code: code, 
    price: price,
    status: true,
    stock: stock,
    category: category, 
    thumbnails: thumbnails

}

    await budines.updateProduct ({...forUpdate})

    res.send ({ succes: true, product: forUpdate })

    } catch (error) {
       console.log('error')

        res.send({ succes: false, error: 'error!' })

    };



})

// Eliminar un producto

router.delete ('/' , async (req, res) => {

    try {


        const {pid} = req.params
        const id = Number(pid)

         if (Number.isNaN(id) || id <= 0) {

            return res.send({ succes: false, error: 'ingresar un número valido' })
        }

       await budines.deleteProduct(id)
       res.send ({ succes: true, Message: 'El producto ha sido eliminado' })


    } catch (error) {
       console.log('error')

        res.send({ succes: false, error: 'error!' })

    };
   




})







export default router