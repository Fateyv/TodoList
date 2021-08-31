import TodosView from '../view/TodosView';
import TodosCollection from '../model/TodosCollection';
import {TODOS_URL} from '../config';

export default class TodosController {
    constructor($el) {
       this.initCollection();
       this.initView($el);
    }

    initCollection() {
        this.todosCollection = new TodosCollection(TODOS_URL);
        this.todosCollection
        .fetchTodos()
        .then (() => this.renderList());
    }

    initView($el) {
        this.todosView = new TodosView($el, {
            onDelete: this.deleteTodo.bind(this),
            onAddTodo: this.addTodo.bind(this),
            onToggle: this.toggleTodo.bind(this)
        });
    }

    renderList() {
        this.todosView.renderList(this.todosCollection.list);
    }

    deleteTodo(id) {
        this.todosCollection.deleteTodo(id);

        this.renderList();
    }

    addTodo(data) {
        this.todosCollection.addTodo(data)
        .then(() => this.renderList());
    }

    toggleTodo(id) {
        this.todosCollection.toggleTodo(id);

        this.renderList();
    }
}