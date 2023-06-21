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
const permission_1 = __importDefault(require("../middlewares/permission"));
bookRoutes.get('/list', upload.none(), BookController.getListBook);
bookRoutes.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/auth/login');
    });
});
bookRoutes.use(permission_1.default);
bookRoutes.get('/create', upload.none(), BookController.getCreateBook);
bookRoutes.post('/create', upload.none(), BookController.createBook);
bookRoutes.get('/update/:id', upload.none(), BookController.getUpdate);
bookRoutes.post('/update', upload.none(), BookController.updateBook);
bookRoutes.delete('/delete/:id', upload.none(), BookController.deleteBook);
exports.default = bookRoutes;
//# sourceMappingURL=book.router.js.map