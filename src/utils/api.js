import axios from 'axios';

export const setTaskStatus = async (taskId, status) => {
   await axios.put(`/tasks/${taskId}`, { done: status });
}

export const deleteTask = async (taskId) => {
   await axios.delete(`/tasks/${taskId}`);
}

export const createTask = async (description) => {
   await axios.post(`/tasks/`, { description: description });
}

export const getTasks = async () => {
   let response = await axios.get('/tasks');
   console.log(response.data);
   return response.data;
}