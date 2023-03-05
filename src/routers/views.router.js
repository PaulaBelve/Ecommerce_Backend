import MyRouter from "./router.js"
import ViewsController from "../controllers/views.controllers.js";

const viewsController = new ViewsController();


export default class ViewsRouter extends MyRouter {

    init() {


        // Vista de los productos

        this.get('/product', viewsController.viewsProducts)


        // Product Detail

        this.get('/product/:pid', viewsController.viewProductDetail)

        // Vista de un carrito

        this.get('/cart/:cid', viewsController.viewsCart)

    }
}



