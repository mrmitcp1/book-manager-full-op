"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bookRoutes = (0, express_1.Router)();
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)();
const BookController = require('../controllers/book.controllter');
bookRoutes.get('/create', upload.none(), BookController.getCreateBook);
bookRoutes.post('/create', upload.none(), BookController.createBook);
bookRoutes.get('/update/:id', upload.none(), BookController.getUpdate);
bookRoutes.post('/update', upload.none(), BookController.updateBook);
bookRoutes.get('/list', upload.none(), BookController.getListBook);
bookRoutes.delete('/delete/:id', upload.none(), BookController.deleteBook);
exports.default = bookRoutes;
//# sourceMappingURL=book.router.js.map