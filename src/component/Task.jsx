import React, { useEffect, useState } from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { TbWriting } from "react-icons/tb";
import { collection, doc,getDoc, setDoc, getDocs,deleteDoc,updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { toast } from 'sonner';
import { Dialog } from 'primereact/dialog';
import Model from './Model';

const Task = () => {
  const [visible,setVisible]=useState(false);
  const [taskText, setTaskText] = useState("");
  const [tasks, setTasks] = useState([]);
  const [docId,setdocId]=useState()

  useEffect(() => {
    fetchData();
  }, [visible]);

  const fetchData = async () => {
    const user = auth.currentUser;
    if (!user) {
      console.log("User not logged in");
      return;
    }

    const collectionRef = collection(db, "users", user.uid, "tasks");
    try {
      const querySnapshot = await getDocs(collectionRef);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log(data)
      setTasks(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const addtask = async () => {
    const user = auth.currentUser;
    if (!user) {
      console.log("User not logged in");
      return;
    }

    const newTask = {
      text: taskText,
      completed: false,
    };

    try {
      const taskId = `${Date.now()}`;
      const taskRef = doc(db, "users", user.uid, "tasks", taskId);
      await setDoc(taskRef, newTask);
      setTaskText("");
      toast.success("Task added successfully");
      fetchData(); 
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };
  const handleChange = async (docId) => {
    const user = auth.currentUser;
    if (!user) {
      console.log("User not logged in");
      return;
    }
  
    const docRef = doc(db, "users", user.uid, "tasks", docId);
    try {
      const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
      const currentCompleted = docSnapshot.data().completed;
      await updateDoc(docRef, { completed:!currentCompleted });
      console.log("Task marked as completed");
      fetchData(); 
    } else {
      console.log("Task not found");
    }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
  
  const deleteData = async (docId) => {
    const user = auth.currentUser;
    if (!user) {
        console.log("User not logged in");
        return;
    }

    const docRef = doc(db, "users", user.uid, "tasks", docId);
    try {
        await deleteDoc(docRef);
        // console.log("Data deleted successfully");
        toast.success("Data deleted successfully");
        fetchData();
    } catch (error) {
        console.error("Error deleting data:", error);
    }
};

const updateData=(id)=>{
 setdocId(id)
 setVisible(true);
}
  return (
    <>
      <div className="flex justify-center gap-3">
        <div className="searchbox flex border border-gray-600 rounded-3xl items-center">
          <input
            className="m-1 w-[30vw] focus:outline-none"
            type="text"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
          />
          <div className="h-9 w-9 flex justify-center items-center bg-[#2b2b2b] rounded-r-3xl">
            <TbWriting size={20} style={{ color: "white" }} />
          </div>
        </div>
        <button onClick={addtask} className="bg-green-400 border border-black p-2 rounded-lg">ADD</button>
      </div>

      <div className="flex justify-center gap-1 m-10">
        <table className="w-3/5 text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3">Completed</th>
              <th scope="col" className="w-4/6 px-6 py-3">Task</th>
              <th scope="col" className="px-6 py-3 flex justify-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id} className="bg-white border-b">
                <td className="px-6 py-4"> <input
  type="checkbox"
  checked={task.completed}
  onChange={() => handleChange(task.id)}
/>
                </td>
                <td className="px-6 py-4">{task.text}</td>
                <td className="px-6 py-4 flex justify-center">
                  <button className="bg-orange-400 p-2 rounded-md m-2">
                    <FaEdit color="white" size={27} onClick={()=>{updateData(task.id)}}/>
                  </button>
                  <button className="bg-red-500 p-2 rounded-md m-2">
                    <RiDeleteBin6Line color="white" size={27} onClick={()=>{deleteData(task.id)}}/>
                  </button>
                </td>
              </tr>
            ))}
            {<Model visible={visible} setVisible={setVisible} docId={docId} />}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Task;
