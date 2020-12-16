import { React, useState, useEffect } from 'react';
import { getTasks } from '../utils/api';
import TaskForm from './TaskForm';
import TaskRow from './TaskTableRow';

const TaskTable = () => {
   const [tasks, setTasks] = useState([]);

   const refreshTasks = async () => {
      try {
         const tasks = await getTasks();
         setTasks(tasks);
      } catch {
         alert(`Can't get tasks from server :(`);
      }
   }

   // Call refreshTasks on component mount with no dependencies
   useEffect(refreshTasks, []);

   return <>
      <TaskForm refreshTasks={refreshTasks} />
      <h2>Current Tasks:</h2>
      <p>
         There are <span class="text-success">{tasks.length}</span> total tasks,
         including <span class="text-danger">{tasks.filter(task => !task.done).length}</span> that are incomplete.
      </p>
      <table class="table table-sm table-striped table-bordered bg-light">
         <thead class="thead-dark">
            <tr>
               <th width='5%'></th>
               <th width='70%'>Description</th>
               <th width='20%'>Created</th>
               <th width='5%'></th>
            </tr>
         </thead>
         <tbody>
            {tasks.map(task => <TaskRow task={task} refreshTasks={refreshTasks} />)}
         </tbody>
      </table>
   </>
}

export default TaskTable;
