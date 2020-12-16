import React, { useState } from 'react';
import { createTask } from '../utils/api';
import { plusIcon } from '../utils/icons';

const TaskForm = (props) => {
   const [description, setDescription] = useState('');
   
   const onSubmit = async (event) => {
      event.preventDefault();
      try {
         await createTask(description);
         props.getTasks();
         setDescription('');
      } catch {
         alert(`Can't create `)
      }
   }

   return <>
      <h2 class="mt-3">New Task</h2>
      <form onSubmit={onSubmit} class="form-inline mb-3">
         <input
            placeholder="Take out the trash"
            class="form-control col"
            name="task-description"
            autoComplete="off"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
         />
         <button class="btn btn-outline-primary" type="submit">
            {plusIcon} Create Task
            </button>
      </form>
   </>
}

export default TaskForm;