import { Link } from "react-router-dom";
import "../styles/TaskList.css";

type TaskListProps = {
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

const TaskList = ({ tasks, onDelete }: TaskListProps) => {
  return (
    <div>
      {tasks.length === 0 ? (
        <i>No tasks found</i>
      ) : (
        <>
          <table className="task-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Due Date</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{task.dueDate}</td>
                  <td>{task.priority}</td>
                  <td>{task.status}</td>
                  <td>
                    <Link to={`/tasks/${task.id}`}>
                      <button>Edit</button>
                    </Link>
                    <button onClick={() => onDelete(task.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default TaskList;
