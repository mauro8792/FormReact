
import React, { useState, useEffect } from 'react';
import './App.css';
import List from './components/List';
import Form from './components/Form';
import {getTodos,save, finish, pending, edit, changeStatusTask, eliminar } from './service/taskService';
import {getTodosUsers, signUPService} from './service/userService'
import Login from './components/Login';
import Nav from './components/Nav';
const App = ()=> {
  
    const [tasks, setTasks] = useState([])
    const [users, setUsers]= useState()
    const [filterTask, setFilterTask] = useState('all')
    const [idTask, setIdTask]= useState()
    const [name, setName]=useState()
    const [description, setDescription] = useState()
    const [border, setBorder]=useState('border border-primary')
    const [login, setLogin]= useState('false')
    const [userLogin, setUserLogin]=useState();
  
  useEffect( () => {
      getTodos().then( data => setTasks( data.tasks ))
  }, [])
  useEffect( () => {
    getTodosUsers().then( data => setUsers( data.users ))
}, [])

  

  const agregarTarea = task =>{    
    save(task)
      .then( ()=> getTodos().then( data => setTasks( data.tasks )))
      .catch( error => alert("Se produjo un Error al agregar la tarea"))
  }

  const editarTarea = task =>{
      edit(task).then( ()=>redirectTask() )
      setName('')
      setDescription('')
      setIdTask('');    
  }

  const deleteTask = task =>{
    eliminar(task).then( ()=>redirectTask() ) 
  }

  const changeTaskStatus = ( task ) => {
    task.done = 1;
    console.log(task);
    changeStatusTask(task).then( ()=> redirectTask() )
  }
  const redirectTask=()=>{
    if (filterTask ==='all') {
      taskAll();
    }
    else if (filterTask ==='pending') {
      taskPending();
    }
    if (filterTask === 'finish') {
      taskFinish();
    }
  }
  const taskAll= ()=>{
    getTodos().then( data => {
      setTasks( data.tasks );
      setFilterTask('all')
      setBorder('border border-primary')
    })
  }
  const taskPending = ()=>{
    pending().then( data => {
      setTasks( data.tasks )
      setFilterTask('pending')
      setBorder('border border-danger')
    })
  }
  const taskFinish= ()=>{
    finish().then( data =>{
      setTasks( data.tasks )
      setFilterTask('finish')
      setBorder('border border-success')
    })
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
  const signUp =(user)=>{
    signUPService(user).then(response => {
      if(response){
        setUserLogin(response)
        setLogin('true')
      }else{
        alert('Usario o Contraseña incorrecta')
      }
    })    
  }
  const logOut = ()=>{
    setLogin('false')
  }
    
  if(login==='true'){
    return (
      
      <div className="container">
        <Nav userLogin={userLogin}  logOut={logOut}/>
        <div className="row " style={{'marginTop': '10%'}}>
          <div className="col">
            <Form 
            agregarTarea={agregarTarea}
            taskEditar={editTask}
            name= {name}
            description = {description}
            id = {idTask}
            editarTarea ={editarTarea}
            users={users}            />
          </div>
          <div className="col-sm">
            <p>Tareas:</p>
            <button type="button" className="btn btn-primary button"  onClick= { taskAll }>Todas</button>
            <button type="button" className="btn btn-danger button"  onClick= { taskPending }>Pendientes</button>
            <button type="button" className="btn btn-success button"  onClick= { taskFinish }>Terminadas</button>
          </div>
          
          <div className={ "col-7  " + border} >
              <List
                tasksList={tasks}
                userList={users}
                onChangeTaskStatus={changeTaskStatus}
                filter= {filterTask}
                editTask={editTask}
                deleteTask={deleteTask}
              />
          </div>
          
        </div>
      </div>
    );
  }else{
    return (
      
      <div className="container">
        
        <Login signUp={signUp}/>
         
      </div>
    );
  }
  
}

export default App;
