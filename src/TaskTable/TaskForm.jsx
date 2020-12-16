import React, { useState } from 'react';
import { createTask } from '../utils/api';
import { plusIcon } from '../utils/icons';

const TaskForm = (props) => {
   const [description, setDescription] = useState('');
   
   const onSubmit = async (event) => {
      event.preventDefault();
      try {
         await createTask(description);
         props.refreshTasks();
         setDescription('');
      } catch {
         alert(`Can't create a new task :(`)
      }
   }

   return <>
      <h2 className="mt-3">New Task</h2>
      <form onSubmit={onSubmit} className="form-inline mb-3">
         <input
            placeholder="Take out the trash"
            className="form-control col"
            name="task-description"
            autoComplete="off"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
         />
         <button className="btn btn-outline-primary" type="submit">
            {plusIcon} Create Task
            </button>
      </form>
   </>
}

export default TaskForm;