import credentials from "../config/credentials.js";

export default class UsersController {

    // REGISTER

    getRegister = async (req, res) => {

        res.render('register', {});
    };



    postRegister = async (req, res) => {

        return res.status(200).redirect('/login')

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
            role: req.user.role,
            social: req.user.social,
            cart: req.user.cart
        }

        res.cookie(credentials.COOKIE_NAME, req.user.token).redirect('/product')


    };

    // LOGIN GITHUB

    loginGitHub = async (req, res) => {

        req.session.user = req.user
        res.cookie(credentials.COOKIE_NAME, req.user.token).redirect('/product')

    };

    // LOGOUT

    logout = (req, res) => {

        req.session.destroy(err => {

            if (err) {
                return req.logger.error(err);
            }
        })

        res.clearCookie(credentials.COOKIE_NAME).redirect('/login')
    };


    getCurrentUser = (req, res) => {
        try {
            const user = req.session.user;

            res.status(200).render("session", { styles: "Css/style.css", user });
        } catch (error) {
            req.logger.error(error);
        }
    };


}