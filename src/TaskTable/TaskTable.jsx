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
         <h2>Current Tasks:</h2>
         <p>
            There are <span class="text-success">{this.state.tasks.length}</span> total tasks, 
            including <span class="text-danger">{this.state.tasks.filter(task => !task.done).length}</span> that are incomplete.
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
               {this.state.tasks.map( task => <TaskRow task={task} refreshTasks={this.refreshTasks} />)}
            </tbody>
         </table>
      </>
   }
}
export default TaskTable;
