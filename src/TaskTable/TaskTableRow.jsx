import axios from 'axios';
import { Component } from 'react';
import { deleteTask, setTaskStatus } from '../utils/api';
import moment from 'moment';

// https://icons.getbootstrap.com/icons/check2-square/
const checkboxComplete = <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-check2-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
   <path fill-rule="evenodd" d="M15.354 2.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L8 9.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
   <path fill-rule="evenodd" d="M1.5 13A1.5 1.5 0 0 0 3 14.5h10a1.5 1.5 0 0 0 1.5-1.5V8a.5.5 0 0 0-1 0v5a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V3a.5.5 0 0 1 .5-.5h8a.5.5 0 0 0 0-1H3A1.5 1.5 0 0 0 1.5 3v10z"/>
   </svg>;

// https://icons.getbootstrap.com/icons/square/
const checkboxEmpty = <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
   <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
   </svg>;

class TaskRow extends Component {
   handleClick = async (taskId) => {
      await deleteTask(taskId);
      this.props.refreshTasks();
   }

   handleCheckbox = async (taskId, doneStatus) => {
      // console.log(doneStatus);
      await setTaskStatus(taskId, doneStatus);
      this.props.refreshTasks();
   }
   render = () => {
      const { task } = this.props;
      return <>
         <tr 
            key={`task-${task.id}`}
            className={(task.done ? 'bg-success text-white' : '')}>
            <td class="align-middle text-center">
               <button
                  className={`btn btn-lg shadow-none ${task.done ? 'text-white' : ''}`}
                  onClick={(() => this.handleCheckbox(task.id, !task.done))}>
                     {task.done ? checkboxComplete : checkboxEmpty}
               </button>
            </td>
            <td class="align-middle">{task.description}</td>
            <td class="align-middle">{moment(task.createdAt).fromNow()}</td>
            <td class="align-middle text-center">
               <button 
                  className={'btn btn-sm btn-danger'}
                  onClick={() => this.handleClick(task.id)}>
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                     <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                     <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                  </svg>
               </button>
            </td>
         </tr>
      </>
   }
}
export default TaskRow;
