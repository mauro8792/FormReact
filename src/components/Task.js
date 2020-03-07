import React from "react"

class Task extends React.Component {
   
    changeStatus = () => {
        this.props.onChangeState(this.props.task)
      }
    editTask = ()=>{
        this.props.editTask(this.props.task.id)
    }
    deleteTask = ()=>{
        this.props.deleteTask(this.props.task.id)
    }
    render() {
        const { name, description, done } = this.props.task
        return (
            <>
            
                <div className="card mb-3" style={{'marginTop': '2%'}}>
                    <div className="card-header">
                        Tarea
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{ name }</h5>
                        
                        <p className="card-text">{ description }</p>
                        <button  className={ done === 0 ? 'btn btn-primary' : 'btn btn-success '} disabled={ done === 0 ? 0 : 1} onClick= { this.changeStatus } >{ done ===0 ? 'Lista' : 'Terminada'} </button>
                        <button  className='btn btn-warning buttonMargin' onClick= { this.editTask } >Editar </button>
                        <button  className='btn btn-danger buttonMargin' onClick= { this.deleteTask } >Borrar </button>
                    </div>
                </div>
               
            </>
        )
    }
}

export default Task


