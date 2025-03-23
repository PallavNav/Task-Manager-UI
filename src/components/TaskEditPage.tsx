import { useParams, useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";

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

const TaskEditPage = ({ tasks, onSave }: TaskEditPageProps) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const taskToEdit = tasks.find((task) => task.id === id);
  if (!taskToEdit) {
    navigate("/");
    return null;
  }

  return <TaskForm onSave={onSave} existingTask={taskToEdit} />;
};

export default TaskEditPage;
