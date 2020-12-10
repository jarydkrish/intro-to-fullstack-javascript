import { Component } from 'react';
import { createTask } from '../utils/api';
import { plusIcon } from '../utils/icons';

class TaskForm extends Component {
   state = {
      description: ''
   }

   onSubmit = async (event) => {
      event.preventDefault();
      await createTask(this.state);
      this.props.getTasks();
      this.setState({ description: '' })
   }
   render = () => {
      console.log(this.props);
      return <>            
         <h2 class="mt-3">New Task</h2>
         <form onSubmit={this.onSubmit} class="form-inline mb-3">
            <input 
               placeholder="Take out the trash"
               class="form-control col"
               name="task-description" 
               value={this.state.description} 
               onChange={(event) => this.setState({ description: event.target.value })} 
            />               
            <button class="btn btn-outline-primary" type="submit">
               {plusIcon} Create Task
            </button>
         </form>
      </>
   }
}
export default TaskForm;
