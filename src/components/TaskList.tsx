import { Link } from "react-router-dom";
import "../styles/TaskList.css";
import { ConvertDate } from "../util/ConvertDate";
import { useState, useEffect } from "react";
import { apiServices } from "../services/service";

type TaskListProps = {
  tasks: Task[];
  onDelete: (id: string) => void;
  checkBoxSelection: (id: string, isChecked: boolean) => void;
  handleSelectAll: () => void;
};

type Task = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: "Low" | "Medium" | "High";
  status: "Pending" | "Completed";
  isChecked: boolean;
  operations:string[]
};

const TaskList = ({ tasks, onDelete, checkBoxSelection, handleSelectAll }: TaskListProps) => {
  const [sortOrder, setSortOrder] = useState<string>('desc');
  const [sortColumn, setSortColumn] = useState<any>('dueDate');
  const [isAllChecked, setIsAllChecked] = useState<boolean>(false);
  const truncationLimit = 25;
  const IS_LOCAL = apiServices.IS_LOCAL;
  useEffect(() => {
    handleSort("dueDate", "asc");
  }, []);

  useEffect(() => {
    const isAllCheckboxSelected = tasks.every((item) => item.isChecked);
    setIsAllChecked(isAllCheckboxSelected);
  }, [tasks]);

  const handleSort = (column: any, order: any) => {
    order = sortColumn === column && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortColumn(column);
    setSortOrder(order);

    tasks.sort((a: any, b: any) => {
      let valA = a[column];
      let valB = b[column];

      if (column === "dueDate") {
        valA = new Date(valA) as unknown as string;
        valB = new Date(valB) as unknown as string;
      }

      if (valA < valB) return order === "asc" ? -1 : 1;
      if (valA > valB) return order === "asc" ? 1 : -1;
      return 0;
    });
  }

  const getSortIndicator = (column: keyof Task) => {
    if (sortColumn === column) {
      return sortOrder === "asc" ? " ↑" : " ↓";
    }
    return "";
  };

  return (
    <div className="no-taks" style={{ height: "100vh" }}>
      {tasks.length === 0 ? (
        <i >No tasks found</i>
      ) : (
        <>
          <table className="task-table">
            <thead>
              <tr>
                {IS_LOCAL && <th><input type="checkbox" checked={isAllChecked} onClick={handleSelectAll}/>Select All </th>}
                <th className="field-label cursor sortable" onClick={() => handleSort("title", undefined)}>Title {getSortIndicator("title")}</th>
                <th className="field-label cursor sortable" onClick={() => handleSort("description", undefined)}>Description {getSortIndicator("description")}</th>
                <th className="field-label cursor sortable" onClick={() => handleSort("dueDate", undefined)}>Due Date {getSortIndicator("dueDate")}</th>
                <th className="field-label cursor sortable" onClick={() => handleSort("priority", undefined)}>Priority {getSortIndicator("priority")}</th>
                <th className="field-label cursor sortable" onClick={() => handleSort("status", undefined)}>Status {getSortIndicator("status")}</th>
                {IS_LOCAL &&<th className="field-label cursor sortable">Operations</th>}
                <th className="field-label">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.length > 0 && tasks.map((task) => (
                <tr key={task.id}>
                  {IS_LOCAL && <td><input type="checkbox" checked={task.isChecked} onClick={(e: any) => checkBoxSelection(task.id, e.target.checked)} /></td>}
                  <td title={task.title}>{(task.title.length > truncationLimit) ? task.title.slice(0, truncationLimit).concat('...') : task.title}</td>
                  <td title={task.description}>{(task.description.length > truncationLimit) ? task.description.slice(0, truncationLimit).concat('...') : task.description}</td>
                  <td title={ConvertDate(task.dueDate)}>{ConvertDate(task.dueDate)}</td>
                  <td title={task.priority}>{task.priority}</td>
                  {IS_LOCAL && <td title={task.priority}>
                    {task.operations.map((ops:any)=>(
                      <div>{ops}</div>
                    ))}
                  </td>}
                  <td title={task.status}>{task.status}</td>
                  <td>
                    <Link to={`/tasks/details/${task.id}`}>
                      <button className="edit-button">Details</button>
                    </Link>
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
