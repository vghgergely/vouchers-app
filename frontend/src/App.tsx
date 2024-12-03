import './App.css';
import axios from 'axios';

function App() {
  return (
    <div className="App">
      <button onClick={() => callEndpoint()}>Hello</button>
    </div>
  );
}

function callEndpoint() {
  axios.get("http://localhost:8080/api/users")
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });
}

export default App;
