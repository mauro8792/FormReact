import React from "react";
import Task from "./Task";

const List =(props)=>{
 return (
    <>
      {props.tasksList.map((task, key) => (
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