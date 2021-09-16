"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = void 0;
const moment_1 = __importDefault(require("moment"));
const formatDate = (value, format) => {
    return moment_1.default(value).format(format);
};
exports.formatDate = formatDate;
//# sourceMappingURL=filters.js.map