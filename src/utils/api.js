import axios from 'axios';

export const setTaskStatus = async (taskId, status) => {
   try {
      await axios.put(`/tasks/${taskId}`, { done: status });
   } catch (error) {
      alert(error);
   }
}

export const deleteTask = async (taskId) => {
   try {
      await axios.delete(`/tasks/${taskId}`);
   } catch (error) {
      alert(error);
   }
}

export const createTask = async (description) => {
   try {
      await axios.post(`/tasks/`, { description: description });
   } catch (error) {
      alert(error);
   }
}

export const getTasks = async () => {
   try {
      let response = await axios.get('/tasks');
      console.log(response.data);
      return response.data;
    } catch (error) {
      alert(error);
    }
}