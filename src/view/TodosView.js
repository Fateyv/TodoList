import '../styles.css';

const DELETE_BTN_SELECTOR = '.delete-btn';
const TODO_ITEM_SELECTOR = '.todo-item';
const ADD_TODO_BTN_SELECTOR = '#addTodobtn';

export default class TodosView {
    constructor($el, config = {}) {
        this._container = $el;
        this._$list = null;
        this._config = config;
        this.$todoInput = $(`#newTodoInput`);

        this.initView();
    }

    initView() {
        this._$list = $('<ul><ul>');
        this._$list.on('click', DELETE_BTN_SELECTOR, this.onListClick.bind(this))
        this._container.on('click', ADD_TODO_BTN_SELECTOR, this.onAddTodoBtnClick.bind(this))
        this._$list.on('click', TODO_ITEM_SELECTOR, this.onToggleTodoClick.bind(this))
        
        this._container.prepend($(this._$list));
    }

    onToggleTodoClick(e) {
        const id = this.getElementId($(e.target));

        this._config.onToggle(id);
    }

    onAddTodoBtnClick() {
        const item = {
            isDone: false,
            title: this.$todoInput.val(),
        };

        this._config.onAddTodo(item);
        this.clearInput();
    }

    clearInput() {
        this.$todoInput.val('');
    }

    onListClick(e) {
        const id = this.getElementId($(e.target));

        this._config.onDelete(id);
    }

    renderList(list) {
        this._$list.html(list.map(this.getListItemHtml).join(''));
    }

    getListItemHtml({ id, title, isDone }) {
        return `<li class= "todo-item 
                    ${isDone ? `done` : ``}" data-todo-id="${id}">
                    ${title} 
                    <span class= "delete-btn">X</span>
                </li>`;
    }

    getElementId($el) {
        return $el.closest(TODO_ITEM_SELECTOR).data('todoId')
    }
}