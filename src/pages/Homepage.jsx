import Todos from "../components/todos-and-activities/Todos/Todos";
import Habits from '../components/habits/Habits.jsx'

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the Productivity Assistant</h1>
        <Todos />
        <Habits />
    </div>
  );
};

export default HomePage;