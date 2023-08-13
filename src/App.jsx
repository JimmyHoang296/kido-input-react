import { useState } from 'react';
import './App.css';
import Login from './page/Login';
import "react-widgets/styles.css";
import Input from './page/Input';

function App() {
  const [login, setLogin] = useState(false)
  const [user, setUser] = useState()
  const [expenseList, setExpenseList] = useState([])
  return (
    <div className="App">
      {login ?
        <div>
          <Input expenseList ={expenseList} user ={user}/>

        </div>
        :
        <Login setLogin={setLogin} setUser = {setUser} setExpenseList ={setExpenseList} />
      }
    </div>
  );
}

export default App;
