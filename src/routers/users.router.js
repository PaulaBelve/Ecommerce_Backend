import passport from "passport";
import UsersController from "../controllers/users.controllers.js";
import MyRouter from "./router.js";

const usersController = new UsersController()

export default class UsersRouter extends MyRouter {

    init() {

        // REGISTER

        this.get("/register", usersController.getRegister)


        this.post('/register', passport.authenticate('register', { failuredirect: '/errors' }), usersController.postRegister)


        // LOGIN LOCAL

        this.get('/login', usersController.getLogin)

        this.post('/login', passport.authenticate('login', { failuredirect: '/errors' }), usersController.postLogin)


        // LOGIN GITHUB

        this.get('/login-github', passport.authenticate('gitHub'), async (req, res) => {

        })

        // Callback

        this.get('/githubcallback', passport.authenticate('gitHub', { failuredirect: '/errors' }), usersController.loginGitHub)

        // LOGOUT

        this.get('/logout', usersController.logout)

        // USER PREMIUM

        this.get("/premium/:uid", usersController.changeUserRole)

        // EMAIL

        this.get('/restore', usersController.getRestore)

        this.post('/restore', usersController.postRestore)

        this.get('/restoreForm/:uid/:token', usersController.getRestoreForm)

        this.post('/restoreForm/:uid/:token', usersController.postRestoreForm)

        // DOCUMENT

        /* this.post(
             "/:uid/documents",
             upload.fields([
                 { name: "documents", maxCount: 3 },
                 { name: "profiles", maxCount: 1 },
                 { name: "products", maxCount: 10 },
             ]),
             usersController.uploadDocument
         );*/



    }
}

