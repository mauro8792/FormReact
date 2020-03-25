import React from "react";
import Task from "./Task";

const List =(props)=>{
    
    return (
       < >
         
         {props.tasksList.map((task, key) => (
             <Task
               
               userList = {()=>props.userList}
               task={task}
               onChangeState={() => props.onChangeTaskStatus(task)}
               editTask = {()=>props.editTask(task)}
               deleteTask={()=>props.deleteTask(task)}
               key={key}
             />
             ))}      
       </>
     );    
  
  
}
export default List;