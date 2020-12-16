import axios from 'axios';

// TODO: Uncomment the HTTP calls once the backend
// is working properly
export const setTaskStatus = async (taskId, status) => {
   // HTTP PUT to /tasks/:id with a body of { done: true/false }
   await axios.put(`/tasks/${taskId}`, { done: status });
}

export const deleteTask = async (taskId) => {
   // HTTP DELETE to /tasks/:id with no body
   await axios.delete(`/tasks/${taskId}`);
}

export const createTask = async (description) => {
   // HTTP POST to /tasks/ with a body of { description: 'some string' }
   await axios.post(`/tasks/`, { description: description });
}

export const getTasks = async () => {
   // HTTP GET to /tasks, which returns an array of task objects
   // from the database. The axios promise resolves and returns
   // the http response as a native javascript object. Return 
   // the HTTP body (located at the `.data` property of there response)
   let response = await axios.get('/tasks');
   console.log(response.data);
   return response.data;
}