
import React, { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import axios from 'axios'

function App() {
  const [count, setCount] = useState(0)
  const [tab,setTab]=useState(1)
  const [task,setTask]=useState('')
  const [todos,setTodos]=useState([])
  const [isEdit,setIsEdit]=useState(false);
  const handleTabs =(tab)=>{
    setTab(tab)
    console.log(tab);
  }
  const handleAddTask=(e)=>{
    e.preventDefault();
    console.log(task)
    axios.post('http://localhost:5000/new-task',{task})
    .then(res=>{
      setTask('');
      console.log("todos updated",res.data)
      setTodos(res.data)
    })
  }
  useEffect(() => {
    axios.get(`http://localhost:5000/read-tasks`)
    .then(res=>{
      console.log('here are the tasks:')
      
      setTodos(res.data);
      console.log(todos);
    })
    .catch(err => {
          console.error('Error fetching tasks:', err);
        });
  }, []);
  const [updateId,setUpdateId]=useState(null);
  const [updateTask,setUpdateTask]=useState('');
  var handleEdit=(id,task)=>{
    setIsEdit(true);
    console.log("id:",id, task);
    setTask(task);
    setUpdateId(id);
    setUpdateTask(task)
    
  }
  const UpdateTask=()=>{
    console.log("updateId:",updateId, "updateTask:",task);
    axios.post(`http://localhost:5000/update-task`,{updateId,task})
    .then(res=>{
      setTodos(res.data);
      setTask('');
      setIsEdit(false);
    })
  }
  return (
    
    <div className="bg-gray-100 w-screen h-screen">
      <div className="flex flex-col w-screen h-screen justify-center items-center">
        <div>
          <h2 className="font-bold text 2xl mb-4 ">TODO LIST</h2>
        </div>
        <div className="flex gap-3"> 
          <input value={task} onChange={e=>setTask(e.target.value)} className=" w-64 p-2 outline-none border border-blue-300 rounded-md" type='text' placeholder="Enter a task to do"></input>
          {isEdit ? <button onClick={UpdateTask} className='bg-blue-600 text-white px-4 rounded-md'>Update</button> :
          <button onClick={handleAddTask} className='bg-blue-600 text-white px-4 rounded-md'>Add </button>}
        </div>
        <div className='flex text-sm w-80 justify-evenly mt-4'>
          <p onClick={(()=>handleTabs(1))} className={`${tab===1 ? 'text-blue-700':'text-black'} cursor-pointer`}>All</p>
          <p onClick={(()=>handleTabs(2))} className={`${tab===2 ? 'text-blue-700':'text-black'} cursor-pointer`}>Active</p>
          <p onClick={(()=>handleTabs(3))} className={`${tab===3 ? 'text-blue-700':'text-black'} cursor-pointer`}>Completed</p>
        </div>
        
        {
          
          todos?.map((todo)=>(
            
                // console.log("todo:",todo.task);
                    <div className='flex justify-between bg-white p-2 w-80 rounded-md'>
                        <div>
                          <p className='text-lg font-semibold'>
                            {todo.task}
                          </p>
                          <p className='text-xs text-gray-600'>
                            {new Date(todo.createdAt).toLocaleString()}
                          </p>
                          <p className='text-sm text-gray-700'>
                            Status: {todo.status}
                          </p>
                        </div>
                        <div className='flex flex-col text-sm justify-start'>
                          <button className='text-blue-600 cursor-pointer' onClick={()=>handleEdit(todo.id,todo.task)}>Edit</button>
                          <button className='text-red-500 cursor-pointer'>Delete</button>
                          <button className='text-green-600 cursor-pointer'>Completed</button>
                        </div>
                      </div>
                       
          ))
                  }
                </div>
            </div>
      
  )
}

export default App
