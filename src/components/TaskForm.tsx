import { useState, useEffect } from "react";
import "../styles/TaskForm.css";
import { useNavigate } from "react-router-dom";

type TaskFormProps = {
  onSave: (task: Task) => void;
  existingTask?: Task | null;
};

type Task = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: "Low" | "Medium" | "High";
  status: "Pending" | "Completed";
};

const TaskForm = ({ onSave, existingTask }: TaskFormProps) => {
  const navigate = useNavigate();
  const [task, setTask] = useState<Task>({
    id: "",
    title: "",
    description: "",
    dueDate: "",
    priority: "Medium",
    status: "Pending",
  });
  const [errors, setErrors] = useState<{ title?: string; description?: string; dueDate?: string }>({});

  useEffect(() => {
    if (existingTask) {
      setTask(existingTask);
    }
  }, [existingTask]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setTask({ ...task, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    let newErrors:{title?:string, description?:string, dueDate?:string} = {};
    if (!task.title.trim()) newErrors.title = "Title is required";
    if (!task.description.trim()) newErrors.description = "Description is required";
    if (!task.dueDate.trim()) newErrors.dueDate = "Due date is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (!task.title.trim()) return;
    onSave(task);
    setTask({
      id: "",
      title: "",
      description: "",
      dueDate: "",
      priority: "Medium",
      status: "Pending",
    });
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <>
      <form onSubmit={handleSubmit} noValidate>
        <label className="field-label">Title: {errors.title && <span className="error">{errors.title}</span>}</label>
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
          placeholder="Give title to your task"
          required
        />
        <label className="field-label">Desc: {errors.description && <span className="error">{errors.description}</span>}</label>
        <textarea
          name="description"
          value={task.description}
          onChange={handleChange}
          placeholder="Enter some description."
        />
        <label className="field-label">Due Date: {errors.dueDate && <span className="error">{errors.dueDate}</span>}</label>
        <input
          type="date"
          name="dueDate"
          value={task.dueDate}
          onChange={handleChange}
          min={new Date().toISOString().split("T")[0]}
        />
        <label className="field-label">Priority:</label>
        <select name="priority" value={task.priority} onChange={handleChange}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <label className="field-label">Status:</label>
        <select name="status" value={task.status} onChange={handleChange}>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
        <button type="submit">{task.id ? "Update" : "Add"} Task</button>
        <button type="button" onClick={handleBack} className="edit-button">
          Manage Tasks
        </button>
      </form>
    </>
  );
};

export default TaskForm;
