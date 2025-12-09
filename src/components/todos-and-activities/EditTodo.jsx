import { use, useContext, useState } from "react";
import { TodoContext } from "../../context/TodoContext";

const EditTodo = () => {

    const { todos, updateTodo, editingTodoId, setEditingTodoId } = useContext(TodoContext);

    const todo = todos.find(todo => todo.id === editingTodoId);

    if (!todo) return null;

    const [title, setTitle] = useState(todo.title);
    const [description, setDescription] = useState(todo.description);
    const status = (todo.status);
    const [estimatedTime, setEstimatedTime] = useState(todo.estimatedTime);
    const [category, setCategory] = useState(todo.category);
    const [deadline, setDeadline] = useState(todo.deadline);

    const handleSave = () => {
        updateTodo(editingTodoId, {
            title,
            description,
            status,
            estimatedTime,
            category,
            deadline
        });
        setEditingTodoId(null);
    }   

  return (
    <div>
      <h2>Edit Your Todo</h2>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}/>
      <select value={estimatedTime} onChange={(e) => setEstimatedTime(e.target.value)}>
        <option value="">Select Estimated Time</option>
        <option value="Minutes">Minutes</option>
        <option value="Hours">Hours</option>
        <option value="Days">Days</option>
      </select>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Select Category</option>
        <option value="Work">Work</option>
        <option value="Home">Home</option>
        <option value="Fitness">Fitness</option>
        <option value="Hobbies">Hobbies</option>
        <option value="Health">Health</option>
      </select>
        <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
        <button onClick={() => {handleSave();}}>Save</button>
    </div>
  );
}

export default EditTodo;
