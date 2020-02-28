import React from "react";
import Task from "./Task";

const List =(props)=>{
  const statusTasks = () => {
    let algo = [];   
    if (props.filter === "pending") {
      algo = props.tasksList.filter(task => task.done === false);
    }
    if (props.filter === "all") {
      algo = props.tasksList;
    }
    if (props.filter === "finish") {
      algo = props.tasksList.filter(task => task.done === true);
    }
    return algo;
  };

  return (
    <>
      {statusTasks().map((task, key) => (
        <Task
          task={task}
          onChangeState={() => props.onChangeTaskStatus(task)}
          editTask = {()=>props.editTask(task)}
          key={key}
        />
      ))}
    </>
  );
}
export default List;