import TaskTable from './TaskTable/TaskTable.jsx';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () =>{
    return <>
      <main className='container bg-light mt-5 p-3 rounded'>
        <h1 className='text-center'>My ToDo App</h1>
        <p>I'm glad you're here. This is a database driven ToDo app written with Node, Express, React, and Bootstrap!</p>
        <TaskTable/>
      </main>
    </>
}
export default App;
