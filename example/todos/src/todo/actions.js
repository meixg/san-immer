import { store } from 'san-store'
import service from '../service'
import { produce } from 'san-immer'

global.store = store

store.addAction('fetchTodos', function (category, {getState, dispatch}) {
    dispatch('updateCategoryFilter', category);

    return service.todos(category).then(todos => {
        if (getState('todosCategoryFilter') === category) {
            dispatch('fillTodos', todos);
        }
    });
});

store.addAction('fillTodos', function (todos) {
    return produce(state => {
        state.todos = todos
    })
});

store.addAction('updateCategoryFilter', function (category) {
    return produce(state => {
        state.todosCategoryFilter = category
    })
});

store.addAction('startRmTodo', function (id, {getState, dispatch}) {
    return service.rmTodo(id).then(todoId => {
        let todos = getState('todos');
        let index = -1;
        todos.forEach((item, i) => {
            if (todoId == item.id) {
                index = i;
            }
        });

        if (index >= 0) {
            dispatch('rmTodo', index);
        }
    });
});

store.addAction('rmTodo', function (index) {
    return produce(state => {
        state.todos.splice(index, 1)
    })
});

// store.addAction('startDoneTodo', function (id, {getState, dispatch}) {
//     return service.doneTodo(id).then(todoId => {
//         let todos = getState('todos');
//         let index = -1;
//         todos.forEach((item, i) => {
//             if (todoId == item.id) {
//                 index = i;
//             }
//         });

//         if (index >= 0) {
//             dispatch('doneTodo', index);
//         }
//     });
// });

// store.addAction('doneTodo', function (index) {
//     return updateBuilder().set('todos[' + index + '].done', true);
// });

// store.addAction('startEditTodo', function (id, {dispatch}) {
//     dispatch('finishEditTodoState', false);

//     if (!id) {
//         let now = new Date();
//         dispatch('updateEditingTodo', {
//             id: 0,
//             title: '',
//             desc: '',
//             endTime: now.getTime(),
//             categoryId: null,
//             done: false
//         });
//     }
//     else {
//         return service.todo(id).then(todo => {
//             dispatch('updateEditingTodo', todo);
//         });
//     }
// });

// store.addAction('updateEditingTodo', function (todo) {
//     return updateBuilder()
//         .set('editingTodo', todo)
//         .set('editingTodoFinished', false);
// });

// store.addAction('submitEditTodo', function (todo, {dispatch}) {
//     let id = todo.id;
//     return service[id ? 'editTodo' : 'addTodo'](todo).then(() => {
//         dispatch('finishEditTodoState', true);
//     });
// });


// store.addAction('finishEditTodoState', function (state) {
//     return updateBuilder()
//         .set('editingTodo', null)
//         .set('editingTodoFinished', state);
// });

