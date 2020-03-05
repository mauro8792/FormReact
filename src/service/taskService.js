export const getTodos = async () => {
  const url = 'http://localhost:3000/api/tasks/'
  const response = await fetch(url);
  const data = await response.json();
  return data
}

export const save = async(task)=>{
  return fetch('http://localhost:3000/api/tasks/', {
    method: 'POST',
    body: JSON.stringify(task),
    headers: {
        'Content-Type': 'application/json'
    }
  }).then(res => {
      return res;
  }).catch(err => err);
}

export const pending = async ()=>{
  const url = 'http://localhost:3000/api/tasks/?status=pending'
  const response = await fetch(url);
  const data = await response.json();
  return data
}
export const finish = async ()=>{
  const url = 'http://localhost:3000/api/tasks/?status=finish'
  const response = await fetch(url);
  const data = await response.json();
  return data
}
export const edit = async (task)=>{
  return fetch(`http://localhost:3000/api/tasks/${task.id}`, {
    method: 'PUT',
    body: JSON.stringify(task),
    headers: {
        'Content-Type': 'application/json'
    }
  }).then(res => {
      console.log(res);
      
      return res;
  }).catch(err => err);
}

export const changeStatusTask = async (task)=>{
  return fetch(`http://localhost:3000/api/tasks/${task.id}/change`, {
    method: 'PUT',
    body: JSON.stringify(task),
    headers: {
        'Content-Type': 'application/json'
    }
  }).then(res => {
      console.log(res);
      
      return res;
  }).catch(err => err);
}


  
export const saveTask = async () => {
    return "tarea guardada"
}

