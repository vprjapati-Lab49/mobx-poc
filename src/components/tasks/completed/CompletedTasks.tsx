import React, { useState } from 'react';
import './CompletedTasks.css';

import store from "../../../Store";
import { Task } from "../../../types/task";
import downArrow from "../../../resources/down-arrow.png";
import { observer } from "mobx-react";

const CompletedTasks = observer(() => {
  const [show, setShow] = useState(false);

  const toggleCompletedTasks = () => {
    setShow(!show);
  }
  return (
    <div className="c-task-main">
      <div className="c-task-main--header" onClick={toggleCompletedTasks}>
        <span> Completed Tasks</span>
        <img src={downArrow} className={`toggle-icon ${!show?'rotate-toggle-icon':''}`} alt="logo"/>
      </div>
      <div className={`todolist-grid ${!show ? 'completed-task-hide' : ''}`}>
        {
          store.completedTasks!.length > 0 ?
            store.completedTasks!.map((item: Task, i: number) => {
              return (
                <div key={i} className="todolist-main__grid-row">
                  <span className="todolist-main__task">{item.title}</span>
                </div>
              )
            })
            :
            <div className="todolist-main__grid-row">
              <span className="todolist-main__no-task">No completed task found.</span>
            </div>
        }
      </div>
    </div>
  );
});

export default CompletedTasks;