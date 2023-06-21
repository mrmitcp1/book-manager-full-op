"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const book_router_1 = __importDefault(require("./src/router/book.router"));
const express_session_1 = __importDefault(require("express-session"));
const connect_livereload_1 = __importDefault(require("connect-livereload"));
const passport_1 = __importDefault(require("passport"));
const auth_router_1 = __importDefault(require("./src/router/auth.router"));
const PORT = 3333;
const app = (0, express_1.default)();
app.set('view engine', 'ejs');
app.set('views', './src/views');
const DB_URL = 'mongodb://127.0.0.1:27017/';
mongoose_1.default.connect(DB_URL)
    .then(() => console.log('DB Connected!'))
    .catch(error => console.log('DB connection error:', error.message));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, express_session_1.default)({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
app.use((0, connect_livereload_1.default)());
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use('/auth', auth_router_1.default);
app.use((req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.userLogin = req.user;
        next();
    }
    else {
        res.redirect('/auth/login');
    }
});
app.use('/book', book_router_1.default);
app.listen(PORT, () => {
    console.log("App running on port: " + PORT);
});
//# sourceMappingURL=index.js.map