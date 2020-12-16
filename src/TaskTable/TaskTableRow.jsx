import { deleteTask, setTaskStatus } from '../utils/api';
import { trashIcon, checkboxCompleteIcon, checkboxEmptyIcon } from '../utils/icons';
import moment from 'moment';
import TaskTable from './TaskTable';

const TaskTableRow = (props) => {
   const handleClick = async (taskId) => {
      await deleteTask(taskId);
      props.refreshTasks();
   }
   
   const handleCheckbox = async (taskId, doneStatus) => {
      // console.log(doneStatus);
      await setTaskStatus(taskId, doneStatus);
      props.refreshTasks();
   }

   const { task } = props;
   return <>
      <tr
         key={`task-${task.id}`}
         className={(task.done ? 'bg-success text-white' : '')}>
         <td class="align-middle text-center">
            <button
               className={`btn btn-lg shadow-none ${task.done ? 'text-white' : ''}`}
               onClick={(() => handleCheckbox(task.id, !task.done))}>
               {task.done ? checkboxCompleteIcon : checkboxEmptyIcon}
            </button>
         </td>
         <td class="align-middle">{task.description}</td>
         <td class="align-middle">{moment(task.createdAt).fromNow()}</td>
         <td class="align-middle text-center">
            <button
               className={'btn btn-sm btn-danger'}
               onClick={() => handleClick(task.id)}>
               {trashIcon}
            </button>
         </td>
      </tr>
   </>
}

export default TaskTableRow;