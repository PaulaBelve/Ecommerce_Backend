import { Router } from "express";
import { ERRORS } from "../const/error.js";
import { usersManager } from "../dao/managers/index.js";
import passport from "passport";
import credentials from "../config/credentials.js"

const router = Router()

// Vista de registro

router.get("/register", (req, res) => {

    res.render("register", {});
});



router.post('/register', passport.authenticate('register', { failuredirect: '/errors' }), async (req, res) => {

    return res.status(200).redirect('/session/login')

})

router.get('/registerFailed', async (req, res) => {

    console.log('failed to register');
    return res.status(404).send({
        Success: 'Error',
        error: `Failed to register`
    })
})

// Vista del login

router.get('/session/login', (req, res) => {

    res.render('/session/login', {})

})

router.post('/login', passport.authenticate('login', { failuredirect: '/errors' }), (req, res) => {

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

router.get('/loginFailed', async (req, res) => {

    //console.log('The login has failed, please try again.');
    return res.status(404).send({
        Success: 'Error',
        error: `The login is failed`
    })
})

// Enviar solicitud del log - admin - user

/*router.get('/login', (req, res) => {

    const { userName, password } = req.query

    res.send('login success')
}) */

// logout

router.get('/logout', (req, res) => {

    req.session.destroy(err => {
        if (err) {
            return console.log('Fallo el logout')
        }
    })

    res.redirect('/session/login')
})



// Vista de todos los usuarios Admin

router.get('/admin', async (req, res) => {

    try {

        const role = req.session.user.role;

        const users = await usersManager.getAllUser();

        if (role === "admin") {

            return res.render('admin', {
                style: 'Css.style.css',
                users,
            })
        }
        return res.redirect('/session/admin')
    }

    catch (error) {

        console.log(error)

    }

})

// Login con gitHub

router.get('/login-github', passport.authenticate('gitHub', { scope: ["user:email"] }), async (req, res) => {


})

// Callback

router.get('/githubcallback', passport.authenticate('gitHub', { failuredirect: '/login' }), async (req, res) => {

    req.session.user = req.user
    res.redirect('/product')

})

export default router