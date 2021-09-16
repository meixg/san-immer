import san from 'san'
import { connect } from 'san-store'
import { Link } from 'san-router'
import { formatDate } from '../filters'
import './List.css'

export const List = connect.san(
    {todos: 'todos', categories: 'categories'},
    {
        list: 'fetchTodos',
        categories: 'fetchCategories',
        rm: 'startRmTodo',
        done: 'startDoneTodo'
    }
)(san.defineComponent({
    template: `
<div class="todos">
    <router-link to="/add" class="todo-add"><i class="fa fa-plus-square"></i></router-link>
    <ul class="filter-category">
        <li
            san-for="item in categories"
            style="background: {{item.color}}"
            class="{{item.id == route.query.category ? 'checked' : ''}}"
        >
            <router-link to="/todos/category/{{ item.id }}">{{ item.title }}</router-link>
        </li>
    </ul>

    <router-link to="/" class="fa fa-close filter-category-clear" style="display: {{route.query.category ? '' : 'none')}}"></router-link>

    <ul class="todo-list">
        <li san-for="item, index in todos"
            style="border-color: {{item.category.color}}"
            class="{{item.done ? 'todo-done' : ''}}"
        >
            <h3>{{ item.title }}</h3>
            <p>{{ item.desc }}</p>
            <div class="todo-meta">
                <span v-if="item.category">{{ item.category.title }} | </span>
                <span>预期完成时间: {{ item.endTime | formatDate('YYYY-MM-DD, h:mm a') }}</span>
            </div>
            <router-link class="fa fa-pencil" to="/edit/{{ item.id }}"></router-link>
            <i class="fa fa-check" on-click="doneTodo(index)"></i>
            <i class="fa fa-trash-o" on-click="rmTodo(index)"></i>
        </li>
    </ul>
</div>
    `,

    components: {
        // @ts-ignore
        'router-link': Link
    },

    filters: {
        formatDate: formatDate
    },
    route: function () {
        let route = this.data.get('route');
        let category = +(route.query.category || 0);

        this.actions.list(category);
        this.actions.categories();
    },


    doneTodo: function (index) {
        var todo = this.data.get('todos')[index];
        this.actions.done(todo.id);
    },

    rmTodo: function (index) {
        var todo = this.data.get('todos')[index];
        this.actions.rm(todo.id);
    }
}))