import credentials from "../config/credentials.js";
import UserService from "../services/users.service.js";

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
            cart: req.user.cart,



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


    getAllUser = async (req, res) => {

        try {

            const users = await UserService.getAllUsers();

            if (!users) {

                CustomError.createError({
                    message: "Db is empty",
                });
            }

            res.status(200).send({
                payload: users,
            });


        } catch (error) {

            console.log(error)

            res.render("errors", {
                error: error.message,
            });
        }
    }

    getRestore = (req, res) => {

        try {

            res.render("restore");


        } catch {

            console.log(error)
            res.render("errors", {

                error: error.message,
            })

        }
    }

    postRestore = async (req, res) => {

        try {

            const { email } = req.body;

            const result = await UserService.sendRestoreMail(email);

            if (!result) {

                return res.render("errors", {

                    error: "email not found"
                })
            }

            res.status(200).redirect("login");

        } catch {

            console.log(error);

            res.render("errors", {
                error: error.message,
            });
        }

    }


    getRestoreForm = async (req, res) => {


        try {

            const { uid, token } = req.params;

            const user = await UserService.findUserById(uid);

            if (!user) {

                CustomError.createError({
                    message: ERRORS_ENUM["USER NOT FOUND"],
                });

                return res.redirect("restore");
            }

            const userToken = await UserService.findUserToken(uid, token);

            if (!userToken) {

                CustomError.createError({
                    message: "INVALID OF EXPIRED TOKEN",
                });

                return res.redirect("restore");

            }

            res.render("restoreForm", {

                style: "style.css",
                ...uid,
                token
            });



        } catch {

            console.log(error);

            res.redirect("restore");

        }
    }

    postRestoreForm = async (req, res) => {

        try {

            const { password } = req.body;
            const { token, uid } = req.params;

            const result = await UserService.restorePassword(uid, password, token);

            if (!result) {

                CustomError.createError({
                    message: ERRORS_ENUM["USER NOT FOUND"],
                });
            }

            res.status(200).redirect("login");


        } catch (error) {

            console.log(error)

            res.render("errors", {
                error: error.message,
            });



        }
    }

    changeUserRole = async (req, res) => {
        try {

            const { uid } = req.params;
            const result = await UserService.changeUserRole(uid)

            if (!result) {

                CustomError.createError({
                    message: "Something went wrong",
                });
            }

            res.status(200).send({
                message: "User succesfully changed role",
            });


        } catch (error) {

            console.log(error)
            res.render("errors", {
                error: error.message,
            });

        }


    }


}









