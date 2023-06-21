import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import bookRoutes from './src/router/book.router';
import session from "express-session";
import livereload from "connect-livereload";
import passport from "passport";
import authRouter from "./src/router/auth.router";


const PORT = 3333;
const app = express();
app.set('view engine','ejs');
app.set('views','./src/views');
const DB_URL = 'mongodb://127.0.0.1:27017/'
mongoose.connect(DB_URL)
    .then(() => console.log('DB Connected!'))

    .catch(error => console.log('DB connection error:', error.message));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
app.use(livereload());
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth',authRouter)
app.use((req: any, res: any, next: any)=> {
    if (req.isAuthenticated()) {
        res.locals.userLogin = req.user
        next();
    } else {
        res.redirect('/auth/login')
    }
})
app.use('/book', bookRoutes);

app.listen(PORT, () => {

    console.log("App running on port: " + PORT)

})