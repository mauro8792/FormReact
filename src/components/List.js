import React from "react";
import Task from "./Task";

class List extends React.Component {
  

  statusTasks = () => {
    let algo = [];   
    if (this.props.filter === "pending") {
      algo = this.props.tasksList.filter(task => task.done === false);
    }
    if (this.props.filter === "all") {
      algo = this.props.tasksList;
    }
    if (this.props.filter === "finish") {
      algo = this.props.tasksList.filter(task => task.done === true);
    }
    return algo;
  };

  
  render() {
    return (
      <>
        {this.statusTasks().map((task, key) => (
          <Task
            task={task}
            onChangeState={() => this.props.onChangeTaskStatus(task)}
            editTask = {()=>this.props.editTask(task)}
            key={key}
          />
        ))}
      </>
    );
  }
}

export default List;

