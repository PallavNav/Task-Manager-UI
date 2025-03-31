import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TaskList from "./TaskList";
import TaskFilter from "./TaskFilter";
import "../styles/TaskPage.css";
import { apiServices } from "../services/service";

type TaskPageProps = {
  tasks: Task[];
  onDelete: (id: string) => void;
  checkBoxSelection: (id: string,isChecked:boolean) => void;
  bulkDelete: () => void;
  handleSelectAll: () => void;
};

type Task = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: "Low" | "Medium" | "High";
  status: "Pending" | "Completed";
  isChecked:boolean;
};

const TaskPage = ({ tasks, onDelete, checkBoxSelection, bulkDelete, handleSelectAll }: TaskPageProps) => {
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const IS_LOCAL = apiServices.IS_LOCAL;
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

  const checkISValid = () => {
    const isToBeDisabled = tasks.some((item)=> item.isChecked)
    return isToBeDisabled;
  }

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
        {tasks?.length > 0 && IS_LOCAL && <button onClick={bulkDelete} className={!checkISValid() ? "disabled-button add-task-btn" : "add-task-btn"} disabled={!checkISValid()}>Delete Bulk Records</button>}
        {tasks?.length > 0 && (
          <div className="filter-container">
            <TaskFilter onFilterChange={handleFilterChange} />
          </div>
        )}
      </div>
      <TaskList tasks={filteredTasks} onDelete={onDelete} checkBoxSelection={checkBoxSelection} handleSelectAll={handleSelectAll}/>
    </div>
    </>
  );
};

export default TaskPage;
