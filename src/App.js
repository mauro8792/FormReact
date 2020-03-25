
import React, { useState, useEffect } from 'react';
import './App.css';
import List from './components/List';
import Form from './components/Form';
import {getTodos,save, finish, pending, edit, changeStatusTask, eliminar, myTask } from './service/taskService';
import {getTodosUsers, signUPService, eliminarUsuario, saveUser} from './service/userService'
import Login from './components/Login';
import Nav from './components/Nav';
import TableUsers from './components/TableUsers';
import FormUser from './components/FormUser';
const App = ()=> {
  
    const [tasks, setTasks] = useState([])
    const [users, setUsers]= useState()
    const [filterTask, setFilterTask] = useState('all')
    const [border, setBorder]=useState('border border-primary')
    const [login, setLogin]= useState('false')
    const [register, setRegister]= useState('false')
    const [userLogin, setUserLogin]=useState();
    //views
    const [viewUser, setViewUser]= useState('false')
    const [viewTask, setViewTask] = useState('true')
    

    const formEmpty={
      id: 0,
      name: ' ',
      description: ' ',
      fk_id_user : ''
    }
    const [formValues, setFormValues] = useState(formEmpty)
  
  useEffect( () => {
      getTodos().then( data => setTasks( data.tasks ))
  }, [])
  useEffect( () => {
    getTodosUsers().then( data => setUsers( data.users ))
}, [])

  

  const agregarTarea = task =>{    
    save(task)
      .then(()=> getTodos().then( data => setTasks( data.tasks )))
      .catch( error => alert("Se produjo un Error al agregar la tarea"))
      setFormValues(formEmpty)
  }

  const editarTarea = task =>{
    edit(task).then( ()=>redirectTask() )
    setFormValues(formEmpty)  
  }

  const deleteTask = task =>{
    console.log(task);
    
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
  const tasksMy=(id,e)=>{
    e.preventDefault();
    myTask(id).then(data => {
      setTasks( data.user )
    })
  }

  const editTask=(task)=>{
    setFormValues(task);
    return task;
  }
  const signUp =(user)=>{
    signUPService(user).then(response => {
      if(response){
        setUserLogin(response)
        setLogin('true')
        setViewTask('true')
      }else{
        alert('Usario o Contraseña incorrecta')
      }
    })    
  }
  const logOut = ()=>{
    setLogin('false')
  }
  const showUser = ()=>{
    
    setViewTask('false')
    setViewUser('true');
  }
  const showTask=()=>{
    setViewUser('false')
    setViewTask('true')
  }
  const deleteUSer=(user)=>{
    eliminarUsuario(user).then(
       getTodosUsers().then( data => setUsers( data.users )))
  }
  const registrar=()=>{
    setRegister('true')
  }
  //aca se crea el usuario, ya se q esta mal el nombre
  const signin =(user)=>{
    saveUser(user).then(
      signUp(user)
    )
    .then(()=>{
      getTodosUsers().then( data => setUsers( data.users ))
      setViewTask('true')
    })
      
  }

  const volverLogin=()=>{
    setRegister('false')
  }

  const onChangeHandler = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value
    })
    
  }
    
  if(login==='true'){
    if(viewTask==='true'){
      return (      
        <div className="container">
          <Nav userLogin={userLogin} showUser={showUser} showTask={showTask}  logOut={logOut}/>
          <div className="row " style={{'marginTop': '10%'}}>
            <div className="col">
              <Form 
              agregarTarea={agregarTarea}
              taskEditar={editTask}
              formValues={formValues}
              //id = {idTask}
              //nameUser={nameUser}
              //fk_id_user={FkIdUser}
              editarTarea ={editarTarea}
              users={users}
              onChangeHandler={onChangeHandler}            />
            </div>
            <div className="col-sm">
              <p>Tareas:</p>
              <button type="button" style={{'width':'100%'}} className="btn btn-primary button"  onClick= { taskAll }>Todas</button>
              <button type="button" style={{'width':'100%'}} className="btn btn-danger button"  onClick= { taskPending }>Pendientes</button>
              <button type="button" style={{'width':'100%'}} className="btn btn-success button"  onClick= { taskFinish }>Terminadas</button>
              <button type="button" style={{'width':'100%'}} className="btn btn-info button"  onClick= { (e)=> tasksMy(userLogin.id,e) }>Mis tareas</button>
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
    }else if(viewUser==='true'){
      return (      
        <div className="container">
          <Nav userLogin={userLogin} showUser={showUser} showTask={showTask} logOut={logOut} />
          <div className="row " style={{'marginTop': '10%'}}>
            
            <TableUsers  users={users} deleteUSer={deleteUSer}  />
          </div>
        </div>
      );
    }
  }else if(register==='false'){
    return (
      
      <div className="container">
        
        <Login signUp={signUp} registrar={registrar}/>
         
      </div>
    );
  }else if(register==='true'){
    return (<div className="container">
        
        <FormUser signin={signin} volverLogin={volverLogin}/>
         
    </div>
    )
  }
  
  
}

export default App;
