export const getTodosUsers = async () => {
    const url = 'http://localhost:3000/api/users/'
    const response = await fetch(url);
    const data = await response.json();    
    return data
}

export const signUPService = async (user)=>{
  return fetch('http://localhost:3000/api/users/login', {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
        'Content-Type': 'application/json'
    }
  }).then(res => res.json() )
  .catch(err => {
    console.log(err);
    return err
  })
  .then(response => { return response.user[0]} );
}
export const eliminarUsuario = async (user)=>{
  console.log(JSON.stringify(user))
  
  return fetch(`http://localhost:3000/api/users/${user}`, {
    method: 'DELETE',
    // body: JSON.stringify(user),
    
    headers: {
        'Content-Type': 'application/json'
    }
  }).then(res => {
      return res;
  }).catch(err => err);
}
export const saveUser = async(user)=>{
  return fetch('http://localhost:3000/api/users/', {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
        'Content-Type': 'application/json'
    }
  }).then(res => {
      return res;
  }).catch(err => err);
}
