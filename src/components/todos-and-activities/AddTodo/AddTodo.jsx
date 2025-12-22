import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import styles from './AddTodo.module.css';

const AddTodo = ({ onClose }) => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const status = "Pending";
    const [estimatedTime, setEstimatedTime] = useState("");
    const [category, setCategory] = useState("");
    const [deadline, setDeadline] = useState("");

  const { addUserTodo } = useContext(AuthContext);

  return (
    <div className={styles.backdrop} onClick={onClose}>
    <div className={styles.addTodoContainer} onClick={(e) => e.stopPropagation()}>
      <h2>Add New Todo</h2>
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
        <button onClick={() => {addUserTodo(title, description, status, estimatedTime, category, deadline);
            setTitle("");
            setDescription("");
            setEstimatedTime("");
            setCategory("");
            setDeadline("");}}>
            Add Todo</button>
    </div>
    </div>
  );
}

export default AddTodo;


