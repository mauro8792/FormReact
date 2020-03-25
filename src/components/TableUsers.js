import React from "react";

const TableUsers = (props)=> {
    
    const eliminarUser = (userid, e)=>{
        e.preventDefault();
        props.deleteUSer(userid)
    }
    
    return (
        <>
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Apellido</th>
                    <th scope="col">User Name</th>
                    <th scope="col">Password</th>
                    <th scope="col">Funciones</th>
                    </tr>
                </thead>
                <tbody>
                    {props.users.map((user, key) => (
                        <tr key={key}>
                            <th scope="row" >{user.id}</th>
                            <td>{user.name}</td>
                            <td>{user.last_name}</td>
                            <td>{user.userName}</td>
                            <td><i class="fas fa-lock"></i> <input type='password'disabled value='{user.password}'/> </td>
                            <td>
                                <button type="button" className="btn btn-outline-success btn-sm"><i className="fas fa-user-edit"></i></button>
                                <button type="button" onClick={(e)=>eliminarUser(user.id, e)} className="btn btn-outline-danger btn-sm" style={{'marginLeft': "5%"}}><i className="fas fa-trash-alt"></i></button>
                            </td>
                        </tr>
             
                    ))}
                    
                </tbody>
            </table>

            
            
        </>
    )
}

export default TableUsers