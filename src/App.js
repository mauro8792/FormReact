
import React, { useState, useEffect } from 'react';
import './App.css';
import List from './components/List';
import Form from './components/Form';
import {getTodos} from './service/taskService';
const App = ()=> {
  
    const [tasks, setTasks] = useState([])
    const [filterTask, setFilterTask] = useState('pending')
    const [idTask, setIdTask]= useState()
    const [name, setName]=useState()
    const [description, setDescription] = useState()
  
  useEffect(() => {
      getTodos().then( data =>  setTasks( data ) )
  }, [])
  const agregarTarea = task =>{    
    const newTasks = [...tasks] 
    task.id=newTasks[newTasks.length-1].id+1;
    newTasks.push( task )
    setTasks(newTasks)
  }
  const editarTarea = task =>{
    const newTasks = [...tasks] 
    newTasks.forEach(t => {
      if(t.id === task.id){
        t.name= task.name;
        t.description = task.description
      }
      setTasks(newTasks)
      setName('')
      setDescription('')
      setIdTask('');
    })
  }
  const changeTaskStatus = ( task ) => {
    const taskUpdated = tasks.map(taskEl => {
      if (taskEl.id === task.id) taskEl.done = !taskEl.done
      return taskEl
    })
    setTasks(taskUpdated)
  }
  
  const taskAll= ()=>{
    setFilterTask('all')
  }
  const taskPending = ()=>{
    setFilterTask('pending')
  }
  const taskFinish= ()=>{
    setFilterTask('finish')
  }
  const editTask=(task)=>{
    let edit;
    const taskUpdated = tasks.map(taskEl => {
      if (taskEl.id === task.id){
        edit = taskEl;
      }
    })
    setIdTask(edit.id)
    setName(edit.name)
    setDescription(edit.description) 
    return edit;
  }
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col">
          <Form 
          agregarTarea={agregarTarea}
          taskEditar={editTask}
          name= {name}
          description = {description}
          id = {idTask}
          editarTarea ={editarTarea}            />
        </div>
        <div className="col-sm">
          <p>Tareas:</p>
          <button type="button" className="btn btn-primary button"  onClick= { taskAll }>Todas</button>
          <button type="button" className="btn btn-danger button"  onClick= { taskPending }>Pendientes</button>
          <button type="button" className="btn btn-success button"  onClick= { taskFinish }>Terminadas</button>
        </div>
        
        <div className="col-7">
            <List
              tasksList={tasks}
              onChangeTaskStatus={changeTaskStatus}
              filter= {filterTask}
              editTask={editTask}
            />
        </div>
        
      </div>
    </div>
  );
  
}

export default App;
