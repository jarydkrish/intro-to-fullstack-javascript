import { Component } from 'react';
import TaskTable from './TaskTable/TaskTable.jsx';

class App extends Component {
  render = () => {
    return <main className='container'>
      <h1>My ToDo App</h1>
      My Tasks:
      <TaskTable/>
    </main>
  }
}
export default App;
