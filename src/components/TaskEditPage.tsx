import { useParams, useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import { useEffect, useState } from "react";
import axios from "axios";

type TaskEditPageProps = {
  tasks: Task[];
  onSave: (task: Task) => void;
};

type Task = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: "Low" | "Medium" | "High";
  status: "Pending" | "Completed";
};

const TaskEditPage = ({ onSave }: TaskEditPageProps) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  useEffect(() => {
    console.log('Changes!!');
    fetchTaskDetailsToBeEdited();
  }, [])

  const fetchTaskDetailsToBeEdited = async () => {
    try {
      const response = await axios.get(`http://localhost:9000/nav/taskify/tasks/${id}`);
      setTaskToEdit(response.data);
    } catch (error) {
      console.error("Error fetching tasks", error);
    }
  }

  if (!taskToEdit) {
    navigate("/");
    return null;
  }

  return <TaskForm onSave={onSave} existingTask={taskToEdit} />;
};

export default TaskEditPage;
