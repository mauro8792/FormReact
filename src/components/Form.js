import React from "react";

class Form extends React.Component {
    
    constructor(props){
        super(props);
    }
    nameTask = React.createRef();
    descriptionTask= React.createRef()
    idTarea = React.createRef()

    crearTarea =(e)=>{
        e.preventDefault();
        let task={};
        if(this.nameTask.current.value && this.descriptionTask.current.value){
            if (this.props.id) {
                task ={
                    id: this.props.id,
                    name : this.nameTask.current.value,
                    description: this.descriptionTask.current.value,
                    done :false
                }
                this.props.editarTarea(task);
            }else{
                task = {
                    id: '',
                    name : this.nameTask.current.value,
                    description: this.descriptionTask.current.value,
                    done :false
                };
                this.props.agregarTarea(task);  
            }
        }
        e.currentTarget.reset();
    }
    render() {
         return (
            
            <div className="card" style={{width: '18rem'}}>
                <div className="card-body">
            <form onSubmit={this.crearTarea}>
                <div className="form-group">
                    <label >{this.props.name ? this.props.name : 'nombre de la tarea'}Nombre de la Tarea</label>
                    <input type="text"  ref={this.nameTask} defaultValue={this.props.name ? this.props.name : ''}  className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    <small id="emailHelp" className="form-text text-muted">Nombre específico de la tarea.</small>
                </div>
                <div className="form-group">
                <label >Tarea </label>
                    <textarea  ref={this.descriptionTask} className="form-control" defaultValue={this.props.description ? this.props.description : ''} id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
                
                <button type="submit" className="btn btn-success">{this.props.description ? 'Guardar cambios' : 'Guardar'}</button>
            </form>
            </div>
        </div>
            
        )
    }
}

export default Form