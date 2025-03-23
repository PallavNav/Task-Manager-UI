import { useState } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskPage from "./components/TaskPage";
import TaskEditPage from "./components/TaskEditPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

type Task = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: "Low" | "Medium" | "High";
  status: "Pending" | "Completed";
};

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTask, setFilteredTask] = useState<Task[]>(tasks);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  const saveTask = (newTask: Task) => {
    if (newTask.id) {
      setTasks((prev: any) =>
        prev.map((item: any) => (item.id === newTask.id ? newTask : item))
      );
      setFilteredTask((prev: any) =>
        prev.map((item: any) => (item.id === newTask.id ? newTask : item))
      );
    } else {
      const newTaskToAdd = {
        ...newTask,
        id: Math.random().toString(36).substr(2, 9),
      };
      setTasks([...tasks, newTaskToAdd]);
      setFilteredTask([...filteredTask, newTaskToAdd]);
    }
    setTaskToEdit(null);
  };

  const deleteTask = (id: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    setFilteredTask(updatedTasks);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<TaskPage tasks={tasks} onDelete={deleteTask} />}
        ></Route>
        <Route
          path="/tasks/new"
          element={<TaskForm onSave={saveTask} existingTask={taskToEdit} />}
        ></Route>
        <Route
          path="/tasks/:id"
          element={<TaskEditPage tasks={tasks} onSave={saveTask} />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
