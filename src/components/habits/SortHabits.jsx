import { useContext, useState } from "react"
import { HabitContext } from "../../context/Habitcontext"


const SortHabits = () => {
    
    const { filterPriority, setFilterPriority, sortBy, setSortBy, order, setOrder} = useContext(HabitContext)
    
    return (
        <div>
            <h2>Sort habits</h2>
            <div className="filter">
                <label>Filter by Priority</label><br />
                <select onChange={(e) => setFilterPriority(e.target.value)} >
                    <option value="All">All</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select><br />
            </div>
            {/* {console.log(filterPriority, sortBy, order)} */}
            <div className="sort">
                <br /><label>Sort by</label><br />
                <select onChange={(e) => setSortBy(e.target.value)}>
                    <option value="Repetitions">Repetitions</option>
                    <option value="Priority">Priority</option>
                </select><br />
            </div>

            <div className="order">
                <label>Order</label><br />
                <select onChange={(e) => setOrder(e.target.value)}>
                    <option value="Ascending">Ascending order</option>
                    <option value="Descending">Descending order</option>
                </select>
                <hr />
             </div>
        </div>
    )
}

export default SortHabits