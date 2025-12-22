import { useContext } from "react";
import { TodoContext } from "../../../context/TodoContext";

const FilterTodo = () => {
    const { statusFilter, setStatusFilter, categoryFilter, setCategoryFilter } = useContext(TodoContext);

    return (
        <>
            <div className="StatusFilter">
                <label htmlFor="StatusFilter" style={{marginRight: "10px"}}>Filter by Status:</label>
                <select name="StatusFilter" id="StatusFilter" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                    <option value="All">All</option>
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                </select>
            </div>
            <div className="CategoryFilter">
                <label htmlFor="CategoryFilter"  style={{marginRight: "10px"}}>Filter by Category:</label>
                <select name="CategoryFilter" id="CategoryFilter" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                    <option value="All">All</option>
                    <option value="Work">Work</option>
                    <option value="Home">Home</option>
                    <option value="Fitness">Fitness</option>
                    <option value="Hobbies">Hobbies</option>
                    <option value="Health">Health</option>
                </select>
            </div>
        </>
    );
}

export default FilterTodo;