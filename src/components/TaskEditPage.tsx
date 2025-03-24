import { useParams, useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import { useEffect, useState } from "react";
import axios from "axios";
import { apiServices } from "../services/service";
import { ConvertDate } from "../util/ConvertDate";

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
  const BASE_URL = apiServices.base_url;

  useEffect(() => {
    console.log('Changes!!');
    fetchTaskDetailsToBeEdited();
  }, [])

  const fetchTaskDetailsToBeEdited = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/tasks/${id}`);
      response.data.dueDate = ConvertDate(response.data.dueDate);
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
