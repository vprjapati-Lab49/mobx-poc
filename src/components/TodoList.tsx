import React, { useState } from 'react';
import '../App.css';

import store from "../Store";

const TodoList = () => {
    const [filter, setFilter] = useState(store.filter);
    const [todo, setTodo] = useState("");

    const applyFilter = (value: string) => {
        setFilter(value);
        store.filter = value;
    }

    const createNewTask = (e: any) => {
        if (e.keyCode === 13) {
            store.createTodoTask(todo);
            setTodo("");
            e.target.value = "";
        }
    }

    return (
        <div className="todolist-main">
            <div className="todolist-main--header">To Do List</div>
            <div className="todolist-grid">
                <div className="todolist-main--filter">
                    <input type="text" placeholder="Search tasks..." value={filter} onChange={e => applyFilter(e.target.value)} />
                </div>
                <div className="todolist-main--newtask">
                    <input type="text"
                        placeholder="Create a new task..."
                        value={todo}
                        onChange={e => setTodo(e.target.value)}
                        onKeyDown={e => createNewTask(e)} />
                </div>
                {
                    store.filteredTodos.map((item, i) => {
                        return (
                            <div key={i} className="todolist-main__grid-row">
                                <span><input type="checkbox" className="todolist-main__check" /></span>
                                <span className="todolist-main__task">{item.title}</span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default TodoList;