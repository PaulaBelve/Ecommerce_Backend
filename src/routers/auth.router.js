import { Router } from "express";
import { ERRORS } from "../const/error.js";
import { usersManager } from "../dao/managers/index.js";


const router = Router()

// Vista del login

router.get('/login', (req, res) => {

    res.render('login', {})

})

// Enviar solicitud del log - admin - user

/*router.get('/login', (req, res) => {

    const { userName } = req.query

    req.session.user = userName

    res.send('login success')

}) */

// Agregar un login - admin - user

router.post('/login', async (req, res) => {

    try {
        const { email, password } = req.body

        if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
            req.session.user = {
                first_name: "admin",
            }

            req.session.user.rol = "admin";
            return res.redirect('/product')
        }

        const user = await usersManager.userLogin(email, password)

        if (!user) {
            // No me lee el error
            res.status(401, { error: "error-UserName y/o password incorrecta" });


            return res.render('login', {})
        }

        req.session.user = user

        res.redirect('/product')

    } catch (error) {

        console.log(error)

    }

})

// logout

router.get('/logout', (req, res) => {

    req.session.destroy()

    res.redirect('/login')
})

// Vista de registro

router.get("/register", (req, res) => {

    res.render("register", {});
});

// Enviar solicitud de registro
router.post("/create", async (req, res) => {

    try {

        const newUser = req.body

        const user = await usersManager.userCreate(newUser);

        if (!user) {

            return res.redirect('/register')
        }

        res.redirect('/login')


    } catch (error) {

        console.log(error)


    }

});

// Vista de todos los usuarios Admin

router.get('/admin', async (req, res) => {

    try {

        const role = req.session.user.role;

        const users = await usersManager.getAllUser();
        //No entra a la vista de admin - tampoco me aparece error
        if (role === "admin") {

            return res.render('admin', {
                style: 'Css.style.css',
                users,
            })
        }
        return res.redirect('/product')
    }

    catch (error) {

        console.log(error)

    }

})

export default router