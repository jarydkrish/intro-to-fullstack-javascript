import './App.css';
import axios from 'axios';

const getTasks = async () => {
  try {
    let response = await axios.get('/tasks');
    console.log(response.data);
  } catch (error) {
    alert(error);
  }

}

function App() {
  getTasks();
  return (
    <div className="App">
      <h1>Hello World</h1>
    </div>
  );
}

export default App;
