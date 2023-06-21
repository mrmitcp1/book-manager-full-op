import {Router} from "express";
const bookRoutes = Router();
import multer from "multer";
const upload = multer();
const BookController = require('../controllers/book.controllter')
import permission from "../middlewares/permission";
import {resolveObjectURL} from "buffer";
import express from "express";
import passport from "passport";




bookRoutes.get('/list',upload.none(),BookController.getListBook)
bookRoutes.get('/logout', (req :any, res :any, next :any)=>{
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/auth/login');
    });
});
bookRoutes.use(permission)
bookRoutes.get('/create',upload.none(),BookController.getCreateBook);
bookRoutes.post('/create',upload.none(),BookController.createBook)
bookRoutes.get('/update/:id',upload.none(),BookController.getUpdate)
bookRoutes.post('/update',upload.none(),BookController.updateBook)
bookRoutes.delete('/delete/:id',upload.none(),BookController.deleteBook)

export default bookRoutes