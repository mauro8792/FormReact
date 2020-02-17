
import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import List from './components/List';
import Form from './components/Form';


// import "bootstrap" from "bootstrap";

class App extends Component{
  constructor(){
    super();
    this.state = {
      tasks: [
          { id: 1, name: "uno", description: "desc uno", done: false},
          { id: 2, name: "dos", description: "desc dos", done: false},
          { id: 3, name: "tres", description: "desc tres", done: false},
          { id: 4, name: "cuatro", description: "desc cuatro", done: false}
      ],
      filterTask: 'pending',
      taskEdit:[],
      idTask: '',
      name : '',
      description: ''
      
    }
  }
  

  agregarTarea = task =>{    
    const newTasks = [...this.state.tasks] 
    task.id=newTasks[newTasks.length-1].id+1;
    newTasks.push( task )
    this.setState({
      tasks :newTasks
    }) 
   }
   editarTarea = task =>{
    const newTasks = [...this.state.tasks] 
    newTasks.forEach(t => {
      if(t.id === task.id){
        t.name= task.name;
        t.description = task.description
      }

      this.setState({
        tasks :newTasks,
        name: '',
        description :'',
        idTask: ''
      }) 
    })
     
   }
   changeTaskStatus = ( task ) => {
    const taskUpdated = this.state.tasks.map(taskEl => {
      if (taskEl.id === task.id) taskEl.done = !taskEl.done
      return taskEl
    })
    this.setState({
      tasks: taskUpdated
    })
  }
  
  taskAll= ()=>{
    this.setState({
      filterTask: 'all'
    })
  }
  taskPending = ()=>{
    this.setState({
      filterTask: 'pending'
    })
  }
  taskFinish= ()=>{
    this.setState({
      filterTask: 'finish'
    })
  }
  
  editTask=(task)=>{
    let edit;
    const taskUpdated = this.state.tasks.map(taskEl => {
      if (taskEl.id === task.id){
        edit = taskEl;
        
        
      }
      
    })
    this.setState({
      idTask : edit.id,
      name :edit.name,
      description:edit.description

    })    
    return edit;
  }
    
  
    
  
  render(){
    return (
      <div className="container">
        <div className="row mt-5">
          <div className="col">
            <Form 
            agregarTarea={this.agregarTarea}
            taskEditar={this.editTask}
            name= {this.state.name}
            description = {this.state.description}
            id = {this.state.idTask}
            editarTarea ={this.editarTarea}            />
          </div>
          <div className="col-sm">
            <p>Tareas:</p>
            <button type="button" className="btn btn-primary button"  onClick= { this.taskAll }>Todas</button>
            <button type="button" className="btn btn-danger button"  onClick= { this.taskPending }>Pendientes</button>
            <button type="button" className="btn btn-success button"  onClick= { this.taskFinish }>Terminadas</button>
          </div>
          
          <div className="col-7">
              <List
                tasksList={this.state.tasks}
                onChangeTaskStatus={this.changeTaskStatus}
                filter= {this.state.filterTask}
                editTask={this.editTask}
              />
          </div>
          
        </div>
      </div>
    );
  }
}

export default App;
