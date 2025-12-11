import { useContext } from "react";
import { TodoContext } from "../../../context/TodoContext";

const SortTodo = () => {
    const { sortOption, setSortOption } = useContext(TodoContext);

    return (
        <>
            <label htmlFor="SortTodo">Sort by:</label>
            <select name="SortTodo" id="SortTodo" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                <option value="DeadlineAsc">Deadline (Earliest First)</option>
                <option value="DeadlineDesc">Deadline (Latest First)</option>
                <option value="TimeEstimateAsc">Time Estimate (Shortest First)</option>
                <option value="TimeEstimateDesc">Time Estimate (Longest First)</option>
                <option value="StatusAsc">Status (Pending First)</option>
                <option value="StatusDesc">Status (Completed First)</option>
            </select>
        </>
    );
}

export default SortTodo;