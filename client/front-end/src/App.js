import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import User from './components/User'
import axios from 'axios';

function App() {

  const [users, setUsers] = useState([])

  useEffect (()=> {
     axios.get('http://localhost:5000/api/users')
     .then(res=> setUsers(res.data))


  }, [])

  return (
    <div className="App">
      <header className="App-header">

        {users.map(u=> {
          return(
            <User stuff = {u}/>
          )
        })}
        
      </header>
    </div>
  );
}

export default App;
