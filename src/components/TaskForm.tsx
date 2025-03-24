import { useState, useEffect } from "react";
import "../styles/TaskForm.css";
import axios from "axios";
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

  useEffect(() => {
    if (existingTask) {
      setTask(existingTask);
    }
  }, [existingTask]);

  const updateTask = async (task:Task) => {
    try {
      const response = await axios.put(`http://localhost:9000/nav/taskify/tasks`);
      // setTaskToEdit(response.data);
    } catch (error) {
      console.error("Error fetching tasks", error);
    }
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
          placeholder="Task Title"
          required
        />
        <textarea
          name="description"
          value={task.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <input
          type="date"
          name="dueDate"
          value={task.dueDate}
          onChange={handleChange}
        />
        <select name="priority" value={task.priority} onChange={handleChange}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <select name="status" value={task.status} onChange={handleChange}>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
        <button type="submit">{task.id ? "Update" : "Add"} Task</button>
        <button type="button" onClick={handleBack}>
          Back
        </button>
      </form>
    </>
  );
};

export default TaskForm;
