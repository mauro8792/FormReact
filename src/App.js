
import React, { useState, useEffect } from 'react';
import './App.css';
import List from './components/List';
import Form from './components/Form';
import {getTodos,save, finish, pending, edit, changeStatusTask } from './service/taskService';
const App = ()=> {
  
    const [tasks, setTasks] = useState([])
    const [filterTask, setFilterTask] = useState('pending')
    const [idTask, setIdTask]= useState()
    const [name, setName]=useState()
    const [description, setDescription] = useState()
  
  useEffect( () => {
      getTodos().then( data => setTasks( data.tasks ))
  }, [])

  

  const agregarTarea = task =>{    
    save(task)
      .then( ()=> getTodos().then( data => setTasks( data.tasks )))
      .catch( error => alert("Se produjo un Error al agregar la tarea"))
  }

  const editarTarea = task =>{
      edit(task).then( ()=> getTodos().then( data => setTasks( data.tasks )) )
      setName('')
      setDescription('')
      setIdTask('');    
  }

  const changeTaskStatus = ( task ) => {
    task.done = 1;
    console.log(task);
    changeStatusTask(task).then( ()=> getTodos().then( data => setTasks( data.tasks )) )
    // const taskUpdated = tasks.map(taskEl => {
    //   if (taskEl.id === task.id) taskEl.done = !taskEl.done
    //   return taskEl
    // })

    // setTasks(taskUpdated)
  }
  
  const taskAll= ()=>{
    getTodos().then( data => setTasks( data.tasks ))
  }
  const taskPending = ()=>{
    pending().then( data => setTasks( data.tasks ))
  }
  const taskFinish= ()=>{
    finish().then( data =>setTasks( data.tasks ))
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
