import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [userList, setUserList] = useState([]);

  const addUser = async () => {
    const data = {
      firstName: firstName,
      lastName: lastName,
      age: age,
    };

    const settings = {
      method: "POST",
      headers: {
        Accept: "Application/json",
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(data),
    };

    try {
      const res = await fetch("http://localhost:3001/users", settings);
      if (res.ok) {
        return res.json();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getUsers = async () => {
    try {
      const res = await fetch("http://localhost:3001/users");
      const data = await res.json();
      if (res.ok) {
        setUserList(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUsers();
  }, [userList]);

  return (
    <div className="App">
      <div className="information">
        <label>FirstName:</label>
        <input
          type="text"
          onChange={(event) => {
            setFirstName(event.target.value);
          }}
        />
        <label>LastName:</label>
        <input
          type="text"
          onChange={(event) => {
            setLastName(event.target.value);
          }}
        />
        <label>Age:</label>
        <input
          type="number"
          onChange={(event) => {
            setAge(event.target.value);
          }}
        />

        <button onClick={addUser}>Add USER</button>
        <div className="userList">
          {userList.map((users) => {
            return (
              <div key={users.id}>
                <h3>{users.firstName}</h3>
                <h3>{users.lastName}</h3>
                <h3>{users.age}</h3>
              </div>
            );
          })}
        </div>
       
      </div>
    </div>
  );
}

export default App;
