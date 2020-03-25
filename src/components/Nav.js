import React from "react";

const Nav = (props)=> {
    const {name} = props.userLogin;
        
    const logOut = ()=>{
        props.logOut();
    }
    const showUser = ()=>{     
        props.showUser();
    }
    const taskView = ()=>{
        props.showTask();
    }
    
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" role="navigation">
                <div className="container">
                    <p className="navbar-brand" >Backlog </p>
                    <button className="navbar-toggler border-0" type="button" data-toggle="collapse" data-target="#exCollapsingNavbar">
                        &#9776;
                    </button>
                    <div className="collapse navbar-collapse" id="exCollapsingNavbar">
                        <ul className="nav navbar-nav">
                            
                            <li className="nav-item">
                                <button type="button" onClick={showUser} className="btn btn-secondary">Usuarios</button>
                            </li>
                            <li className="nav-item" > 
                                <button type="button" onClick={taskView} className="btn btn-secondary" style={{'marginLeft': '10%'}}>Tareas</button>
                            </li>
                        </ul>
                        <ul className="nav navbar-nav flex-row justify-content-between ml-auto">
                        <li className="nav-item"  >
                            <p className="nav-link ">Usuario: {name}</p>
                        </li>
                        <li className="nav-item" >
                            <button type="button" onClick={logOut} className="btn btn-outline-secondary">Cerrar Sesion</button>
                        </li>
                            
                        </ul>
                    </div>
                </div>
            </nav>
            
        </>
    )
}

export default Nav