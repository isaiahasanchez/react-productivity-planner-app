import "./styles.css"
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import { useState, useEffect } from 'react'




export default function App(){
    const [tasks, setTasks] = useState(() => {
      const localValue = localStorage.getItem('TASKS');
      return localValue ? JSON.parse(localValue) : [
        {
          id: 1,
          text: "Doctors Appointment",
          day: "Feb 5th at 2:30pm",
          reminder: true
        }
      ];
    });
  
  const[showAddTask, setShowAddTask]= useState(false)


useEffect(() => {
    localStorage.setItem("TASKS", JSON.stringify(tasks))
}, [tasks])



  

// Add Task
const addTask = (task) => {
  const id = Math.floor(Math.random() *1000) + 1
  const newTask = {id, ...task }
  setTasks([...tasks, newTask])
}

// Delete Task
const deleteTask = (id) => {
  setTasks(tasks.filter((task) => task.id !== id))
}

// Toggle Reminder
const toggleReminder = (id) => {
  setTasks(tasks.map((task) => task.id == id ? {...task, reminder: !task.reminder} : task))
}

  return (
    <div className="container">
      <Header
        title="Productivity Planner"
        onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
      />
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
      ) : (
        <p style={{ textAlign: 'center', fontSize: '18px', color: '#999' }}>
        No Tasks to Show
      </p>
      )}
    </div>
  );
}