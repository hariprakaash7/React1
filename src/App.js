import logo from './logo.svg';
import './App.css';
import Todo from './components/Todo';
import Form from './components/Form';
import FilterButton from './components/FilterButton';
import { useState } from 'react';
import {nanoid} from 'react';
function App(props) {
  const [tasks,settasks] = useState(props.tasks)
function addTask(name) {
  const newtask = {id:'todo-'+{nanoid},name: name, completed:false}
  settasks([...tasks,newtask])
}
function toggleTaskCompleted(id) {
  const updatedTasks = tasks.map(task => {
    // if this task has the same ID as the edited task
    if (id === task.id) {
      // use object spread to make a new object
      // whose `completed` prop has been inverted
      return {...task, completed: !task.completed}
    }
    return task;
  });
  settasks(updatedTasks);
}
function deletetask(id)
{
    const remainingtasks=tasks.filter(task => id !== task.id)
    settasks(remainingtasks)
}
function editTask(id, newName) {
  const editedTaskList = tasks.map(task => {
  // if this task has the same ID as the edited task
    if (id === task.id) {
      //
      return {...task, name: newName}
    }
    return task;
  });
  settasks(editedTaskList);
}
const tasklist = tasks.map(task => (
  <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deletetask={deletetask}
      editTask={editTask}
  />
));
  const noun=tasklist.length !==1 ? 'tasks':'task'
  const headingtext=`${tasklist.length} ${noun} remaining`
  return (
    <div className="todoapp stack-large">
    <h1>TodoMatic</h1>
    <Form addTask={addTask}/>
    <div className="filters btn-group stack-exception">
      <FilterButton name="All"/>
      <FilterButton name="Completed"/>
      <FilterButton name="Active"/>
    </div>
    <h2 id="list-heading">
      {headingtext}
    </h2>
    <ul
      role="list"
      className="todo-list stack-large stack-exception"
      aria-labelledby="list-heading"
    >
     {tasklist}
    </ul>
  </div>
  )
}


export default App;
