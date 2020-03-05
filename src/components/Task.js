import React from "react"

class Task extends React.Component {
   
    changeStatus = () => {
        this.props.onChangeState(this.props.task)
      }
    editTask = ()=>{
        this.props.editTask(this.props.task.id)
    }
    render() {
        const { name, description, done } = this.props.task
        return (
            <>
                <div className="card mb-3">
                    <div className="card-header">
                        Tarea
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{ name }</h5>
                        <p className="card-text">{ description }</p>
                        <button  className={ done === 0 ? 'btn btn-primary' : 'btn btn-success '} disabled={ done === 0 ? 0 : 1} onClick= { this.changeStatus } >{ done ===0 ? 'Lista' : 'Terminada'} </button>
                        <button  className='btn btn-warning buttonMargin' onClick= { this.editTask } >Editar </button>
                    </div>
                </div>
            </>
        )
    }
}

export default Task


