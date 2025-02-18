import { useState, useEffect } from 'react'

const App = () => {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const fetchData = async() => {
    try {
      const res = await fetch('http://localhost:8000/data');
      const data = await res.json();

      setMessage(JSON.stringify(data));
    }
    catch(err_) {
      console.log(err_);
    }
  }
  const loginForm = async(e) => {
    e.preventDefault();
    const submission = {username, password};
    try{
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(submission)
      });
      const data = await response.json();
      setMessage(JSON.stringify(data));
    }
    catch(err_) {
      console.log(err_);
    }
  }

  return(
    <div>
    <div>
      <form>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => {setUsername(e.target.value)}}
          required
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => {setPassword(e.target.value)}}
          required
        />
        <button type="submit"
          onClick={loginForm}
        >
          Submit
        </button>
      </form>
    </div>
      <div>
        <p>{message}</p>
        <button
        onClick={fetchData}>
          Get Data!
        </button>
      </div>
    </div>
  )
}
export default App;