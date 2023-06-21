"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const permission = (req, res, next) => {
    if (req.user.role === 'admin') {
        next();
    }
    else {
        return res.end('403');
    }
};
exports.default = permission;
//# sourceMappingURL=permission.js.map