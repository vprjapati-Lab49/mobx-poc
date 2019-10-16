import { autorun, observable, computed } from 'mobx';
import { Status, Task } from './types/task';

class TodoStore {
    @observable todos: Array<Task> = [];
    @observable filter: string = ""

    @observable completedTasks: Array<Task> = [];

    @computed get filteredTodos() {
        const matchesFilter = new RegExp(this.filter, "");
        return this.todos.filter(todo => !this.filter || matchesFilter.test(todo.title))
    }

    createTodoTask(value: string) {
        this.todos.push({ title: value, description: '', timestamp: new Date(), status: Status.NEW });
    }
}

var store = new TodoStore();

export default store;

autorun(() => {
    console.log(store.filter);
    console.log(store.todos);
})