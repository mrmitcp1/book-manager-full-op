import {Router} from "express";
const bookRoutes = Router();
import multer from "multer";
const upload = multer();
const BookController = require('../controllers/book.controllter')

bookRoutes.get('/create',upload.none(),BookController.getCreateBook);
bookRoutes.post('/create',upload.none(),BookController.createBook)
bookRoutes.get('/update/:id',upload.none(),BookController.getUpdate)
bookRoutes.post('/update',upload.none(),BookController.updateBook)
bookRoutes.get('/list',upload.none(),BookController.getListBook)
bookRoutes.delete('/delete/:id',upload.none(),BookController.deleteBook)

export default bookRoutes