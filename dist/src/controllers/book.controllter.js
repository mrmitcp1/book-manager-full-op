"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bookRoutes = (0, express_1.Router)();
const bookSchema_1 = require("../shemas/bookSchema");
const multer_1 = __importDefault(require("multer"));
const author_model_1 = require("../shemas/author.model");
const upload = (0, multer_1.default)();
class BookControllter {
    static async createBook(req, res) {
        try {
            const authorNew = new author_model_1.Author({
                name: req.body.author
            });
            const bookNew = new bookSchema_1.Book({
                title: req.body.title,
                description: req.body.description,
                author: authorNew,
            });
            bookNew.keywords.push({ keyword: req.body.keyword });
            const p1 = authorNew.save();
            const p2 = await bookNew.save();
            let [author, book] = await Promise.all([p1, p2]);
            if (book) {
                res.redirect("/book/list");
            }
            else {
                res.render('error');
            }
        }
        catch (err) {
            res.render('error');
        }
    }
    static async getCreateBook(req, res) {
        await res.render('createBook');
    }
    static async updateBook(req, res) {
        try {
            const book = await bookSchema_1.Book.findOne({ _id: req.body.id });
            book.title = req.body.title;
            book.description = req.body.description;
            book.author = req.body.author;
            await book.save();
            if (book) {
                res.redirect('/book/list');
            }
            else {
                res.render('error');
            }
        }
        catch (err) {
            res.render('error');
        }
    }
    static async getUpdate(req, res) {
        try {
            const book = await bookSchema_1.Book.findOne({ _id: req.params.id });
            if (book) {
                res.render('updateBook', { book: book });
            }
            else {
                res.render('error');
            }
        }
        catch (e) {
            res.render('error');
        }
    }
    static async getListBook(req, res) {
        try {
            let query = {};
            if (req.query.keyword && req.query.keyword !== "") {
                let keywordFind = req.query.keyword || "";
                query = {
                    "keywords.keyword": {
                        $regex: keywordFind
                    }
                };
            }
            if (req.query.author && req.query.author !== "") {
                let authorFind = req.query.author || "";
                let author = await author_model_1.Author.findOne({ name: { $regex: authorFind } });
                query = Object.assign(Object.assign({}, query), { author: author });
            }
            let limit;
            const allBooks = await bookSchema_1.Book.find();
            let currentPage = req.query.page ? +req.query.page : 1;
            if (!req.query.limit) {
                limit = 3;
            }
            else {
                limit = parseInt(req.query.limit);
            }
            let totalPages = Math.ceil(allBooks.length / limit);
            let offset = (currentPage - 1) * limit;
            const books = await bookSchema_1.Book.find(query).limit(limit).skip(offset).populate({
                path: "author", select: "name"
            });
            const users = req.user;
            res.render('listBook', { books: books, totalPages: totalPages, currentPage: currentPage, users: users });
        }
        catch (err) {
            res.render('error');
        }
    }
    static async deleteBook(req, res) {
        try {
            const book = await bookSchema_1.Book.findOne({ _id: req.params.id });
            if (book) {
                await book.deleteOne();
                res.status(200).json({
                    message: 'success'
                });
            }
            else {
                res.render('error');
            }
        }
        catch (err) {
            res.render('error');
        }
    }
}
module.exports = BookControllter;
//# sourceMappingURL=book.controllter.js.map