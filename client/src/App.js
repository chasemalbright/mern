import './App.css';
import { useState, useEffect } from 'react';
import Axios from 'axios';

function App() {
    const [name, setName] = useState("");
    const [age, setAge] = useState(0);
    const [friendList, setFriendlist] = useState([])

    const getfriend = () => {
        Axios.get('http://localhost:3002/read')
            .then((response) => {
                setFriendlist(response.data)
            })
            .catch(() => {
                console.log('error')
            })
    };

    const refresh = () => {
        getfriend();
    }

    const updateFriend = id => {
        const newAge = prompt("Enter New Age:  ");

        Axios.put('http://localhost:3002/update', {newAge: newAge, id: id});

        refresh();
    }

    const deleteFriend = id => {
        Axios.delete(`http://localhost:3002/delete/${id}`)

        refresh();
    }


    const addfriend = () => {
        Axios.post('http://localhost:3002/addfriend', {
            name: name,
            age: age,
        })
        refresh();
    };

    useEffect(() => {
        getfriend();
    },[])


  return (
    <div className="App">
        <div className="inputs">
            <input
                type="text"
                placeholder="Name"
                onChange={(e) => {setName(e.target.value)}}
            />
            <input
                type="number"
                placeholder="Age"
                onChange={(e) => {setAge(e.target.value)}}
            />
            <button onClick={addfriend}>
                Add Friend
            </button>
        </div>
        <div className="listoffriends">
            {friendList.map(val => {
                return (
                    <div className="friendcontainer">
                        <div className="friend">
                            <h3>Name: {val.name}</h3>
                            <h3>Age: {val.age}</h3>
                        </div>
                        <button className="update" onClick={() => {updateFriend(val._id)}}>Update</button>
                        <button className="delete" onClick={() => {deleteFriend(val._id)}}>X</button>
                    </div>
                )
            })}
        </div>

    </div>
  );
}

export default App;
