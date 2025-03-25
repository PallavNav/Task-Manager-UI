import { Link } from "react-router-dom";
import "../styles/TaskList.css";
import { ConvertDate } from "../util/ConvertDate";

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
    <div className="no-taks" style={{height:"100vh"}}>
      {tasks.length === 0 ? (
        <i >No tasks found</i>
      ) : (
        <>
          <table className="task-table">
            <thead>
              <tr>
                <th className="field-label">Title</th>
                <th className="field-label">Description</th>
                <th className="field-label">Due Date</th>
                <th className="field-label">Priority</th>
                <th className="field-label">Status</th>
                <th className="field-label">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.length > 0 && tasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{ConvertDate(task.dueDate)}</td>
                  <td>{task.priority}</td>
                  <td>{task.status}</td>
                  <td>
                    <Link to={`/tasks/${task.id}`}>
                      <button className="edit-button">Edit</button>
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
