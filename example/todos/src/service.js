"use strict";
/**
 * @file 服务
 */
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = __importDefault(require("./data"));
/**
 * 对象属性拷贝
 *
 * @inner
 * @param {Object} target 目标对象
 * @param {Object} source 源对象
 * @return {Object} 返回目标对象
 */
function extend(target, source) {
    for (var key in source) {
        if (source.hasOwnProperty(key)) {
            target[key] = source[key];
        }
    }
    return target;
}
exports.default = {
    todos: function (category) {
        var categoryMap = {};
        for (var i = 0; i < data_1.default.category.length; i++) {
            var item = data_1.default.category[i];
            categoryMap[item.id] = item;
        }
        var todos = [];
        for (var i = 0; i < data_1.default.list.length; i++) {
            var item = data_1.default.list[i];
            if (!category || item.categoryId === category) {
                item = extend({}, item);
                todos.push(item);
                if (item.categoryId) {
                    item.category = extend({}, categoryMap[item.categoryId]);
                }
            }
        }
        return new Promise(function (resolve) {
            resolve(todos);
        });
    },
    todo: function (id) {
        var categoryMap = {};
        for (var i = 0; i < data_1.default.category.length; i++) {
            var item = data_1.default.category[i];
            categoryMap[item.id] = item;
        }
        var result = null;
        for (var i = 0; i < data_1.default.list.length; i++) {
            var item = data_1.default.list[i];
            if (item.id === id) {
                if (item.categoryId) {
                    item = extend({}, item);
                    item.category = extend({}, categoryMap[item.categoryId]);
                }
                result = item;
            }
        }
        return new Promise(function (resolve) {
            resolve(result);
        });
    },
    categories: function () {
        var categories = [];
        for (var i = 0; i < data_1.default.category.length; i++) {
            categories.push(extend({}, data_1.default.category[i]));
        }
        return new Promise(function (resolve) {
            resolve(categories);
        });
    },
    doneTodo: function (id) {
        for (var i = 0; i < data_1.default.list.length; i++) {
            var item = data_1.default.list[i];
            if (item.id === id) {
                item.done = true;
                break;
            }
        }
        return new Promise(function (resolve) {
            resolve(id);
        });
    },
    rmTodo: function (id) {
        id = +id;
        for (var i = 0; i < data_1.default.list.length; i++) {
            var item = data_1.default.list[i];
            if (item.id === id) {
                data_1.default.list.splice(i, 1);
                break;
            }
        }
        return new Promise(function (resolve) {
            resolve(id);
        });
    },
    addTodo: function (todo) {
        var first = data_1.default.list[0];
        var id = 1;
        if (first) {
            id = first.id + 1;
        }
        todo = extend({}, todo);
        todo.id = id;
        data_1.default.list.unshift(todo);
        return new Promise(function (resolve) {
            resolve(todo);
        });
    },
    editTodo: function (todo) {
        todo = extend({}, todo);
        for (var i = 0; i < data_1.default.list.length; i++) {
            var item = data_1.default.list[i];
            if (item.id === todo.id) {
                data_1.default.list[i] = todo;
                break;
            }
        }
        return new Promise(function (resolve) {
            resolve(todo);
        });
    },
    addCategory: function (category) {
        var first = data_1.default.category[0];
        var id = 1;
        if (first) {
            id = first.id + 1;
        }
        category = extend({}, category);
        category.id = id;
        data_1.default.category.unshift(category);
        return new Promise(function (resolve) {
            resolve(category);
        });
    },
    rmCategory: function (id) {
        id = +id;
        for (var i = 0; i < data_1.default.category.length; i++) {
            var item = data_1.default.category[i];
            if (item.id === id) {
                data_1.default.category.splice(i, 1);
                break;
            }
        }
        return new Promise(function (resolve) {
            resolve(id);
        });
    },
    editCategory: function (category) {
        category = extend({}, category);
        for (var i = 0; i < data_1.default.category.length; i++) {
            var item = data_1.default.category[i];
            if (item.id === category.id) {
                data_1.default.category[i] = category;
                break;
            }
        }
        return new Promise(function (resolve) {
            resolve(category);
        });
    }
};
//# sourceMappingURL=service.js.map