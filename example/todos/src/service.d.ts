/**
 * @file 服务
 */
declare const _default: {
    todos: (category: any) => Promise<unknown>;
    todo: (id: any) => Promise<unknown>;
    categories: () => Promise<unknown>;
    doneTodo: (id: any) => Promise<unknown>;
    rmTodo: (id: any) => Promise<unknown>;
    addTodo: (todo: any) => Promise<unknown>;
    editTodo: (todo: any) => Promise<unknown>;
    addCategory: (category: any) => Promise<unknown>;
    rmCategory: (id: any) => Promise<unknown>;
    editCategory: (category: any) => Promise<unknown>;
};
export default _default;
