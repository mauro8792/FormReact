import React from "react";

const Form = (props)=> {
    const crearTarea =(e)=>{
        e.preventDefault();
        
        let task={};
        if(props.formValues.name && props.formValues.description){
            if (props.formValues.id) {
                task ={
                    id: props.formValues.id,
                    name : props.formValues.name,
                    description: props.formValues.description,
                    done :props.formValues.done,
                    fk_id_user : props.formValues.fk_id_user
                }
                props.editarTarea(task);
            }else{
                task = {
                    name : props.formValues.name,
                    description: props.formValues.description,
                    done :false,
                    fk_id_user : props.formValues.fk_id_user
                };
                console.log('tarea',task);
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
                        <input type="text" onChange={props.onChangeHandler} value={props.formValues.name} name="name" className="form-control" />
                        <small id="emailHelp" className="form-text text-muted">Nombre específico de la tarea.</small>
                    </div>
                    <div className="form-group">
                        <select className="custom-select" onChange={props.onChangeHandler} name="fk_id_user" >
                              <option defaultValue='default'  >Seleccionar usuario</option> 
                             {/* <option  defaultValue={props.fk_id_user ? props.fk_id_user: ''} >{props.nameUser ? props.nameUser : ''}</option> */}
                            {props.users && props.users.map((users, key)=>(
                                <option   value={ users.id} key={key} selected={props.formValues.fk_id_user === users.id} >{users.name}</option>     
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                    <label >Tarea </label>
                        <textarea  className="form-control" onChange={props.onChangeHandler} value={props.formValues.description} name="description" rows="3"></textarea>
                    </div>
                    
                    <button type="submit" className="btn btn-success">{props.description ? 'Guardar cambios' : 'Guardar'}</button>
                    <button type="reset"  className="btn btn-secondary" style={{'marginLeft': '5%'}}>Reset</button>
                </form>
            </div>
        </div>
        
    )
}

export default Form