import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TaskList from "./TaskList";
import TaskFilter from "./TaskFilter";
import "../styles/TaskPage.css";

type TaskPageProps = {
  tasks: Task[];
  onDelete: (id: string) => void;
};

type Task = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: "Low" | "Medium" | "High";
  status: "Pending" | "Completed";
};

const TaskPage = ({ tasks, onDelete }: TaskPageProps) => {
  const [filteredTasks, setFilteredTasks] = useState(tasks);

  const handleFilterChange = (filters: {
    status: string;
    priority: string;
  }) => {
    let filtered = tasks;
    if (filters.status) {
      filtered = filtered.filter((task) => task.status === filters.status);
    }
    if (filters.priority) {
      filtered = filtered.filter((task) => task.priority === filters.priority);
    }
    setFilteredTasks(filtered);
  };

  useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks]);

  return (
    <>
      <div className="task-container">
      <div className="header-section">
        <Link to="/tasks/new">
          <button className="add-task-btn">Add New Task</button>
        </Link>
        {tasks.length > 0 && (
          <div className="filter-container">
            <TaskFilter onFilterChange={handleFilterChange} />
          </div>
        )}
      </div>
      <TaskList tasks={filteredTasks} onDelete={onDelete} />
    </div>
    </>
  );
};

export default TaskPage;
