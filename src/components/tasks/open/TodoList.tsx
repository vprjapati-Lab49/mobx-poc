import React, { useState } from 'react';
import './TodoList.css';

import store from "../../../Store";
import { Status, Task } from "../../../types/task";
import { observer } from "mobx-react";

const TodoList = observer(() => {
  const [filter, setFilter] = useState(store.filter);
  const [todo, setTodo] = useState("");
  const [nextTaskId, setNextTaskId] = useState(5);

  const applyFilter = (value: string) => {
    setFilter(value);
    store.filter = value;
  }

  const createNewTask = (e: any) => {
    if (e.keyCode === 13) {
      store.updateTodos({ id: nextTaskId, title: todo, description: '', timestamp: new Date(), status: Status.NEW });
      setTodo("");
      e.target.value = "";
      setNextTaskId(nextTaskId + 1);
    }
  }

  const markComplete = (id: number) => {
    store.markComplete(id);
  }

  return (
    <div className="todolist-main">
      <div className="main--header">To Do List</div>
      <div className="todolist-grid">
        <div className="todolist-main--filter">
          <input type="text" placeholder="Search tasks..." value={filter} onChange={e => applyFilter(e.target.value)}/>
        </div>
        <div className="todolist-main--newtask">
          <input type="text"
                 placeholder="Create a new task..."
                 value={todo}
                 onChange={e => setTodo(e.target.value)}
                 onKeyDown={e => createNewTask(e)}/>
        </div>
        {
          store.filteredTodos.length > 0 ?
            store.filteredTodos.map((item: Task, i: number) => {
              return (
                <div key={i} className="todolist-main__grid-row">
                  <span><input type="checkbox" className="todolist-main__check"
                               onChange={() => markComplete(item.id)}/></span>
                  <span className="todolist-main__task">{item.title}</span>
                </div>
              )
            })
            :
            <div className="todolist-main__grid-row">
              <span className="todolist-main__no-task">No task found.</span>
            </div>
        }
      </div>
    </div>
  );
});

export default TodoList;