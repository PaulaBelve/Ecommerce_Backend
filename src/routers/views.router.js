import MyRouter from "./router.js"
import ViewsController from "../controllers/views.controllers.js";
import cartControllers from "../controllers/carts.controllers.js";
import { passportCall } from "../utils/jwt.js";

const viewsController = new ViewsController();
const cartsControllers = new cartControllers();


export default class ViewsRouter extends MyRouter {

    init() {


        // Vista de los productos

        this.get('/product', passportCall('jwt'), viewsController.viewsProducts)


        // Product Detail

        this.get('/product/:pid', passportCall('jwt'), viewsController.viewProductDetail)

        // Vista de un carrito

        this.get('/cart/:cid', viewsController.getCartPage) //viewsController.viewsCart

        this.post("/cart/:cid/purchase", cartsControllers.purchaseCart);

        // Vista Admin

        //this.get('/admin', viewsController.viewsAdmin)

    }
}



