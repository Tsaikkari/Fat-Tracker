"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
require("./db/index");
const apiErrorHandler_1 = __importDefault(require("./middlewares/apiErrorHandler"));
const apiContentType_1 = __importDefault(require("./middlewares/apiContentType"));
const responseHandler_1 = __importDefault(require("./middlewares/responseHandler"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(responseHandler_1.default);
// custom API error handler
app.use(apiErrorHandler_1.default);
app.use(apiContentType_1.default);
app.get('/', (req, res, next) => {
    res.send('hello world');
});
exports.default = app;
