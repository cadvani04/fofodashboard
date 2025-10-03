'use client';
import { useState, useEffect } from "react";

/*
const items = [
    { id: 1, text: "Task 1" },
    { id: 2, text: "Task 2" },
    { id: 3, text: "Task 3" },
  ];
*/


export default function AllTasks() {
  const [items, setTasks] = useState([]);
  
  useEffect(() => {
    const fetchTasks = async () => {
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      const uuid = currentUser.uuid;
      console.log(uuid);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/alltasks?uuid=${uuid}`);
      const data = await response.json();
      setTasks(data.tasks);
    }
    fetchTasks();
  }, []); 
  console.log(items);
  return (

    <div className="bg-blue-800 flex flex-col items-center align-top mt-30 rounded-md border-5 border-blue-800 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-5">All Tasks</h1>
      <ul>
        {items.map((tasks) => (
        <li className="text-white text-lg" key={tasks[0]}>
        {tasks[4]==='pending' ? <span className="text-green-500">Pending</span> : <span className="text-red-500">Completed</span>}
        <span className="border-hover ml-5">{tasks[2]}</span>
        </li>
        ))}
        
    </ul>

    </div>
  );
}