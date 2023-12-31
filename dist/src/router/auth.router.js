"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const authRouter = express_1.default.Router();
authRouter.get('/login', auth_controller_1.default.getFormLogin);
authRouter.post('/login', auth_1.default.authenticate('local', {
    successRedirect: '/book/list',
    failureRedirect: '/auth/login'
}));
exports.default = authRouter;
//# sourceMappingURL=auth.router.js.map