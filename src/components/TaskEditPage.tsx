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
  isChecked:boolean;
  operations:string[]
};

const TaskEditPage = ({ tasks, onSave }: TaskEditPageProps) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const BASE_URL = apiServices.base_url;
  const IS_LOCAL = apiServices.IS_LOCAL;

  useEffect(() => {
    console.log('Changes!!');
    fetchTaskDetailsToBeEdited();
  }, [])

  const fetchTaskDetailsToBeEdited = async () => {
    try {
      if (IS_LOCAL) {
        console.log(tasks);
        const taskToEdit:any = tasks.find((item)=> item.id === id);
        setTaskToEdit(taskToEdit);
      } else {
        const response = await axios.get(`${BASE_URL}/tasks/${id}`);
        response.data.dueDate = ConvertDate(response.data.dueDate);
        setTaskToEdit(response.data);
      }
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
