import { Component } from 'react';
import { createTask } from '../utils/api';

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
               <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-plus-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                  <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
               </svg>
               &nbsp;
               Create Task
            </button>
         </form>
      </>
   }
}
export default TaskForm;
