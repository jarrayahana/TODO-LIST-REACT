import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    
    <div className="bg-gray-100 w-screen h-screen">
      <div className="flex flex-col w-screen h-screen justify-center items-center">
        <div>
          <h2 className="font-bold text 2xl">TODO LIST</h2>
        </div>
        <div className="flex gap-3"> 
          <input className=" w-64 p-2 outline-none border border-blue-300 rounded-md" type='text' placeholder="Enter a task to do"></input>
          <button className='bg-blue-600 text-white px-4 rounded-md'>Add</button>
        </div>
        <div className='flex justify-between bg-white p-2 w-80'>
          <div>
            <p className='text-lg font-semibold'>
              task 1
            </p>
            <p className='text-xs text-gray-600'>
              10/12/2025 10:30
            </p>
            <p className='text-sm text-gray-700'>
              Status: Active
            </p>
          </div>
          <div className='flex flex-col text-sm justify-start'>
            <button>Edit</button>
            <button>Delete</button>
            <button>Completed</button>
          </div>
        </div>
      </div>
    </div>
      
  )
}

export default App
