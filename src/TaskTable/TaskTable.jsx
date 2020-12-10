import axios from 'axios';
import { Component } from 'react';
import TaskRow from './TaskTableRow';
import { getTasks } from '../utils/api';
import TaskForm from './TaskForm';

class TaskTable extends Component {
   state = {
      tasks: []
   }

   refreshTasks = async () => {
      const tasks = await getTasks();
      this.setState({
         tasks: tasks
      })
   }

   componentDidMount = () => {
      this.refreshTasks();
   }

   render = () => {
      return <>
         <TaskForm getTasks={this.refreshTasks} />
         <table>
            <thead>
               <tr>
                  <td></td>
                  <td>Description</td>
                  <td>Created</td>
               </tr>
            </thead>
            <tbody>
               {this.state.tasks.map( task => <TaskRow task={task} refreshTasks={this.refreshTasks} />)}
            </tbody>
         </table>
      </>
   }
}
export default TaskTable;
