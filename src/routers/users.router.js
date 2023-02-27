import { usersManager } from "../dao/managers/index.js";
import passport from "passport";
import credentials from "../config/credentials.js"
import MyRouter from "./router.js";



export default class UsersRouter extends MyRouter {

    init() {

        // REGISTER

        this.get("/register", (req, res) => {

            res.render("register", {});
        });



        this.post('/register', passport.authenticate('register', { failuredirect: '/errors' }), async (req, res) => {

            return res.status(200).redirect('/users/login')

        })

        this.get('/registerFailed', async (req, res) => {

            console.log('failed to register');
            return res.status(404).send({
                Success: 'Error',
                error: `Failed to register`
            })
        })

        // LOGIN LOCAL

        this.get('/login', (req, res) => {

            res.render('login', {})

        })

        this.post('/login', passport.authenticate('login', { failuredirect: '/errors' }),
            (req, res) => {

                if (!req.user) {
                    return res.status(400).send({
                        Success: 'Error',
                        error: `Invalid credentials`
                    });
                }

                /* req.session.user = {
                     first_name: req.user.first_name,
                     last_name: req.user.last_name,
                     email: req.user.email,
                     zona: req.user.zona,
                     role: req.user.role,
                     social: req.user.social
                 } */

                req.session.user = req.user;

                res.cookie(credentials.COOKIE_NAME, req.user.token).redirect('/product')

            })

        this.get('/loginFailed', async (req, res) => {

            //console.log('The login has failed, please try again.');
            return res.status(404).send({
                Success: 'Error',
                error: `The login is failed`
            })
        })


        // LOGOUT

        this.get('/logout', (req, res) => {

            req.session.destroy(err => {

                if (err) {
                    return console.log('Fallo el logout')
                }
            })

            res.clearCookie(credentials.COOKIE_NAME).redirect('/users/login')
        })



        // VISTA USUARIOS ADMIN

        this.get('/admin', async (req, res) => {

            try {

                const role = req.session.user.role;

                const users = await usersManager.getAllUser();

                if (role === "admin") {

                    return res.render('admin', {
                        style: 'Css.style.css',
                        users,
                    })
                }
                return res.redirect('/users/admin')
            }

            catch (error) {

                console.log(error)

            }

        })

        // LOGIN GITHUB

        this.get('/login-github', passport.authenticate('gitHub', { scope: ["user:email"] }), async (req, res) => {


        })

        // Callback

        this.get('/githubcallback', passport.authenticate('gitHub', { failuredirect: '/error' }), async (req, res) => {

            req.session.user = req.user
            res.cookie(credentials.COOKIE_NAME, req.user.token).redirect('/product')
            //res.redirect('/product')

        })

    }
}

