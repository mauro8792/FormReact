import React from "react";
import './LoginCSS.css';
const Login = (props)=> {
   
    let userName = React.createRef();
    let password= React.createRef()

    const loginForm =(e)=>{
        e.preventDefault();
        let user={};
        if(userName.current.value && password.current.value){
            user ={
                userName : userName.current.value,
                password: password.current.value
            }
            props.signUp(user)
            
            
        }
        e.currentTarget.reset();
    }
    const registrarUser =()=>{
        props.registrar();
    }
    return (
        
        <div>
            <div className="sidenav">
                <div className="login-main-text">
                <img src={'https://cdn.educba.com/academy/wp-content/uploads/2019/06/agile-tool.jpg'} className="img-fluid" alt="Tools"/>
                
                </div>
            </div>
            <div className="main">
                <div className="col-md-6 col-sm-12">
                    <div className="login-form">
                        <form onSubmit={loginForm}>
                            <div className="form-group">
                                <label>Usuario</label>
                                <input type="text"  ref={userName} className="form-control" placeholder="User Name"/>
                            </div>
                            <div className="form-group">
                                <label>Contraseña</label>
                                <input type="password" ref={password} className="form-control" placeholder="Password"/>
                            </div>
                            <button type="submit" className="btn btn-secondary">Ingresar</button>
                            <button type="submit" onClick={registrarUser} className="btn btn-primary" style={{'marginLeft': '2%'}} >Registrar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        
        
    )
}

export default Login