import credentials from "../config/credentials.js";

export default class UsersController {

    // REGISTER

    getRegister = async (req, res) => {

        res.render('register', {});
    };



    postRegister = async (req, res) => {

        return res.status(200).redirect('/users/login')

    };



    // LOGIN LOCAL

    getLogin = async (req, res) => {

        res.render('login', {})

    };

    postLogin = async (req, res) => {

        if (!req.user) {
            return res.status(400).send({
                Success: 'Error',
                error: `Invalid credentials`
            });
        }

        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            zona: req.user.zona,
            email: req.user.email,
            rol: req.user.rol,
            social: req.user.social
        }

        res.cookie(credentials.COOKIE_NAME, req.user.token).redirect('/product')

    };

    // LOGIN GITHUB

    loginGitHub = async (req, res) => {

        req.session.user = req.user
        res.cookie(credentials.COOKIE_NAME, req.user.token).redirect('/product')

    };

    // Callback

    /*   this.get('/githubcallback', passport.authenticate('gitHub', { failuredirect: '/error' }), async (req, res) => {
   
           req.session.user = req.user
           res.cookie(credentials.COOKIE_NAME, req.user.token).redirect('/product')
   
   
       }) */

    // LOGOUT

    logout = (req, res) => {

        req.session.destroy(err => {

            if (err) {
                return console.log('Fallo el logout')
            }
        })

        res.clearCookie(credentials.COOKIE_NAME).redirect('/users/login')
    };



    // VISTA USUARIOS ADMIN

    viewsAdmin = async (req, res) => {

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

    };










}