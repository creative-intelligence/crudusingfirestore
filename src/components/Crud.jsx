import React, { useState, useEffect } from "react";
import {collection,addDoc,getDocs,deleteDoc,doc,updateDoc,} from "firebase/firestore";
import db from "../firebase";

const Crud = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [id, setId] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const [users, setUsers] = useState([]);

  const createHandler = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateUserData();
      } else {
        await addUserData();
      }
    } catch (error) {
      console.error("Error adding/updating document: ", error);
    }
  };

  const addUserData = async () => {
    const docRef = await addDoc(collection(db, "userData"), {
      name: name,
      age: age,
    });

    console.log("Document written with ID: ", docRef.id);
    // alert("Added Successfully");
    setName("");
    setAge("");
  };
  const updateUserData = async () => {
    const userRef = doc(db, "userData", id);
    try {
      await updateDoc(userRef, {
        name: name,
        age: age,
      });
      
      setName("");
      setAge("");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };
  
  

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDocs(collection(db, "userData"));
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchData();
  }, []);

  const editHandler = (userId, userName, userAge) => {
    setName(userName);
    setAge(userAge);
    setId(userId);
    setIsEditing(true);
  };

  const deleteHandler = async (userId) => {
    const deleteUser = doc(db, "userData", userId);
    await deleteDoc(deleteUser);
    // alert("Deleted Successfully");
  };

  return (
    <div className="max-w-md mx-auto mt-4">
      <form onSubmit={createHandler} className="mb-8">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="age"
          >
            Age
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="age"
            type="number"
            placeholder="Enter Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          {isEditing ? "Update" : "Create"}
        </button>
      </form>
      <ul className="divide-y divide-gray-300">
        {users.map((user) => (
          <li key={user.id} className="py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-lg font-bold">{user.name}</h1>
                <p className="text-gray-600">Age: {user.age}</p>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => editHandler(user.id, user.name, user.age)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteHandler(user.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Crud;
