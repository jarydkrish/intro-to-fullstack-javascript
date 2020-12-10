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
         <form onSubmit={this.onSubmit}>
            <input value={this.state.description} onChange={(event) => this.setState({ description: event.target.value })} />
            <button type="submit">Create Task</button>
         </form>
      </>
   }
}
export default TaskForm;
