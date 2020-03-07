import React from "react";

const Form = (props)=> {
    
    
    let nameTask = React.createRef();
    let descriptionTask= React.createRef()
    
    let user = React.createRef()

    const crearTarea =(e)=>{
        e.preventDefault();
        console.log(user.current.value);
        
        let task={};
        if(nameTask.current.value && descriptionTask.current.value){
            if (props.id) {
                task ={
                    id: props.id,
                    name : nameTask.current.value,
                    description: descriptionTask.current.value,
                    done :false
                }
                props.editarTarea(task);
            }else{
                task = {
                    name : nameTask.current.value,
                    description: descriptionTask.current.value,
                    done :false
                };
                props.agregarTarea(task);  
            }
        }
        e.currentTarget.reset();
    }
   
    return (
        
        <div className="card" style={{width: '18rem'}}>
            <div className="card-body">
                <form onSubmit={crearTarea}>
                    <div className="form-group">
                        <label >Nombre de la Tarea</label>
                        <input type="text"  ref={nameTask} defaultValue={props.name ? props.name : ''}  className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                        <small id="emailHelp" className="form-text text-muted">Nombre específico de la tarea.</small>
                    </div>
                    <div className="form-group">
                        <select className="custom-select">
                            <option value='DEFAULT' >Seleccionar usuario</option>
                            {props.users && props.users.map((users, key)=>(
                                <option ref={user} value={users.id} key={key}>{users.name}</option>     
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                    <label >Tarea </label>
                        <textarea  ref={descriptionTask} className="form-control" defaultValue={props.description ? props.description : ''} id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>
                    
                    <button type="submit" className="btn btn-success">{props.description ? 'Guardar cambios' : 'Guardar'}</button>
                </form>
            </div>
        </div>
        
    )
}

export default Form