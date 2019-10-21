import { computed, decorate, observable } from 'mobx';
import { Status, Task } from './types/task';

/*
//Approach:1

const store: Partial<{ todos: Array<Task>, filter: string, completedTasks: Array<Task>, filteredTodos: any, updateTodos: any }> = observable({
  todos: [] as Array<Task>,
  filter: "",
  completedTasks: [] as Array<Task>,
  get filteredTodos() {
    const matchesFilter = new RegExp(this.filter, "");
    return this.todos.filter((todo: Task) => !this.filter || matchesFilter.test(todo.title))
  },
  updateTodos(value: Task) {
    if (this.todos) {
      this.todos.push(value);
    } else {
      this.todos = [value];
    }
  }

  markComplete(id: number) {
    const completedTask: any = this.todos!.find(task => task.id === id);
    this.todos = store.todos!.filter(task => task.id !== id);
    this.completedTasks!.push({ ...completedTask, status: Status.COMPLETED });
  }
});*/


/*
// Approach:2

class TodoStore {
    @observable todos: Array<Task> = [];
    @observable filter: string = ""

    @observable completedTasks: Array<Task> = [];

    @computed get filteredTodos() {
        const matchesFilter = new RegExp(this.filter, "");
        return this.todos.filter(todo => !this.filter || matchesFilter.test(todo.title))
    }

  updateTodos(value: Task) {
    if (this.todos) {
      this.todos.push(value);
    } else {
      this.todos = [value];
    }
  }

  markComplete(id: number) {
    const completedTask: any = this.todos!.find(task => task.id === id);
    this.todos = store.todos!.filter(task => task.id !== id);
    this.completedTasks!.push({ ...completedTask, status: Status.COMPLETED });
  }
}

var store = new TodoStore();
 */
class TodoStore {
  todos: Array<Task> = [
    { id: 1, title: "New Task", status: Status.NEW },
    { id: 2, title: "Another Task", status: Status.NEW },
    { id: 3, title: "One more task", status: Status.NEW },
    { id: 4, title: "Co-ordinate with Team", status: Status.NEW }
  ] as Array<Task>;
  filter: string = ""
  completedTasks: Array<Task> = [];

  get filteredTodos(): Array<Task> {
    const matchesFilter = new RegExp(this.filter, "");
    return this.todos.filter(todo =>
      (!this.filter || matchesFilter.test(todo.title)) &&
      [Status.NEW, Status.IN_PROGRESS, Status.OVERDUE].includes(todo.status)
    )
  }

  updateTodos(value: Task) {
    if (this.todos) {
      this.todos.push(value);
    } else {
      this.todos = [value];
    }
  }

  markComplete(id: number) {
    const completedTask: any = this.todos!.find(task => task.id === id);
    this.todos = store.todos!.filter(task => task.id !== id);
    this.completedTasks!.push({ ...completedTask, status: Status.COMPLETED });
  }
}

decorate(TodoStore, {
  todos: observable,
  filter: observable,
  completedTasks: observable,
  filteredTodos: computed
})

var store = new TodoStore();

export default store;

