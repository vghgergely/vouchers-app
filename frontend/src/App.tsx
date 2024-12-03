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
  axios.post("http://localhost:8080/api/vouchers/redemption/1/redeem")
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });
}

export default App;
