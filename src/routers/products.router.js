import { Router } from "express";
import { ERRORS } from "../const/error.js";
import { productsManager } from "../dao/managers/index.js";


const router = Router()

// Base de datos, que devuelve formato json

//Todos los productos 
// Get conectado con Managers

router.get ('/', async (req, res) => {

try {

    const {sort, query, page, limit} = req.query;

    const options = {

    limit : limit || 5,
    page : page || 1,
    sort : {price:sort} || {price : 1},
    leart: true,
};

const products = await productsManager.getProducts(query, options);


        console.log(products)



res.send ({
    status:"success",
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

    console.log (error)




}

})

// Traer un solo producto por id

router.get ('/:pid' , async (req, res) => {

try {

    const {pid} = req.body

    const product = await productsManager.getProductById(pid)


res.send({ status: succes,
    payload: product })


} catch (error) {

    console.log("error")
    console.log(error)

    res.send({ succes: false, error: "ha ocurrido un error" })


}

})

// Agregar un producto

router.post ('/', async (req, res) => {

try{

    const newProduct = req.body

    if(!newProduct) {

        return res.send({
            status: "error",
            error: "EMPTY PRODUCT",
          });
    }
    
       const result = await productsManager.addProduct(newProduct)

       res.send({
        status: "succes",
        payload: result,
      });


}catch (error){

    console.log("error")
    console.log(error)

    res.send({ succes: false, error: "ha ocurrido un error" })



} })


// Actualizar un producto

router.put ('/:pid', async (req, res) => {

    try {   
        
        const { pid } = req.params

    const productToReplace = req.body

    const result = await ProductManager.updateProduct(pid, productToReplace)

    res.send({status: 'success', 
    payload: result})

} catch (error) {

    console.log('error')

        if (error.name === ERRORS.NOT_FOUND_ERROR) {

            return res.send({
                succes: false,
                error: `${error.name}: ${error.message}`

            })
        }

        res.send({ succes: false, error: 'Ha ocurrido un error!' })

}


})

// Eliminar un producto

router.delete('/:pid', async (req, res) => {
    try {   
        
        const { pid } = req.params
    
        const result = await ProductManager.deleteProduct(pid)
    
        res.send({status: 'success', payload: result})
    
    } catch (error) {
    
        console.log('error')
        if (error.name === ERRORS.NOT_FOUND_ERROR) {
    
            return res.send({
                succes: false,
                error: `${error.name}: ${error.message}`
    
            })
        }
    
        res.send({ succes: false, error: 'Ha ocurrido un error!' })
    }
    })







router.get('/', async (req, res) => {

    // Mongo DB

    try {

        const products = await productModel.find()

        console.log(products)

        res.send(products)

        // MANAGERS

        /* 
                const { limit } = req.query
        
                const allProducts = await budines.getProducts()
        
                if (!limit || limit < 1) {
        
                    return res.send({ succes: true, products: allProducts })
                }
        
                const products = allProducts.slice(0, limit)
        
        
                res.send({ succes: true, products }) */

    } catch (error) {

        console.log("error")
        console.log(error)

        res.send({ succes: false, error: "ha ocurrido un error" })


    }

})

// Filtrar producto por ID MANAGERS

/*router.get('/:id', async (req, res) => {

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

});*/

// Agregar un producto

router.post('/', async (req, res) => {

    // MONGO DB

    try {

        const result = await productModel.create(req.body)

        res.json(result)

        // MANAGERS

        /*   const { title, description, code, price, stock, category, thumbnails } = req.body
   
   
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
   
           await budines.addProduct({ ...productoAgregado })
   
           res.send({ succes: true, product: productoAgregado }) */

    } catch (error) {
        console.log('error')


        if (error.name === ERRORS.VALIDATION_ERROR) {

            return res.send({
                succes: false,
                error: `${error.name}: ${error.message}`

            })
        }

        res.send({ succes: false, error: 'Ha ocurrido un error!' })

    };

})

// Actualizar un producto con mongose

router.put('/:pid', async (req, res) => {
try {   const { pid } = req.params

    const productToReplace = req.body

    const result = await productModel.updateOne({_id: pid}, productToReplace)

    res.send({status: 'success', payload: result})

} catch (error) {

    console.log('error')

        if (error.name === ERRORS.NOT_FOUND_ERROR) {

            return res.send({
                succes: false,
                error: `${error.name}: ${error.message}`

            })
        }

        res.send({ succes: false, error: 'Ha ocurrido un error!' })

}
})

// Eliminar un producto con mongose

router.delete('/:pid', async (req, res) => {
try {   
    
    const { pid } = req.params

    const result = await productModel.deleteOne({_id: pid})

    res.send({status: 'success', payload: result})

} catch (error) {

    console.log('error')
    if (error.name === ERRORS.NOT_FOUND_ERROR) {

        return res.send({
            succes: false,
            error: `${error.name}: ${error.message}`

        })
    }

    res.send({ succes: false, error: 'Ha ocurrido un error!' })
}
})




/*router.put('/:pid', async (req, res) => {

    try {

        const { pid } = req.params
        const id = Number(pid)

        if (Number.isNaN(id) || id < 0) {

            return res.send({ succes: false, error: 'ingresar un número valido' })
        }


        const { title, description, code, price, stock, category, thumbnails } = req.body


        const forUpdate = await budines.updateProduct(id, {

            title: title,
            description: description,
            code: code,
            price: price,
            status: true,
            stock: stock,
            category: category,
            thumbnails: thumbnails


        })

        return res.send({ succes: true, product: forUpdate })

        /*     await budines.updateProduct({ ...forUpdate })
     
          return res.send({ succes: true, product: forUpdate }) */

  /*  } catch (error) {
        console.log('error')

        if (error.name === ERRORS.NOT_FOUND_ERROR) {

            return res.send({
                succes: false,
                error: `${error.name}: ${error.message}`

            })
        }

        res.send({ succes: false, error: 'Ha ocurrido un error!' })

    };
})*/

// Eliminar un producto

/*router.delete('/:pid', async (req, res) => {

    try {


        const { pid } = req.params
        const id = Number(pid)

        if (Number.isNaN(id) || id <= 0) {

            return res.send({ succes: false, error: 'ingresar un número valido' })
        }

        const deleteProducts = await budines.deleteProduct(id)
        //  res.send({ succes: true, Message: 'El producto ha sido eliminado' })

        res.send({ succes: true, deleted: deleteProducts })


    } catch (error) {
        console.log('error')
        if (error.name === ERRORS.NOT_FOUND_ERROR) {

            return res.send({
                succes: false,
                error: `${error.name}: ${error.message}`

            })
        }

        res.send({ succes: false, error: 'Ha ocurrido un error!' })

    };



}) */


export default router