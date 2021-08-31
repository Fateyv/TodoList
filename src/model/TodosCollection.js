export default class TodosCollection {
    constructor(url) {
        this._url = url;
        this.list = [];
    }

    fetchTodos() {
        return fetch(this._url)
            .then((resp) => resp.json())
            .then((data) => this.setData(data));
    }

    setData(data) {
        this.list = data;
    }

    deleteTodo(id) {
        this.list = this.list.filter((item)=> +item.id !== id);

        return fetch(`${this._url}/${id}`, {
            method: 'DELETE',
        }).then((resp) => resp.json());
    }

    addTodo(data) {
        if (data.title === '') {
            return;
        }
        return fetch(this._url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),})
            .then((resp) => resp.json())
            .then((data) => this.list.push(data))
    }

    toggleTodo(id) {
        const todo = this.list.find((item) => item.id == id);
            todo.isDone = !todo.isDone

        return fetch(`${this._url}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(todo),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((resp) => resp.json());
    }
}