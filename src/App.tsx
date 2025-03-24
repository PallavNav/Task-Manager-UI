import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import TaskForm from "./components/TaskForm";
import TaskPage from "./components/TaskPage";
import TaskEditPage from "./components/TaskEditPage";
import Header from "./pages/Header";
import { apiServices } from "./services/service";

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
  const BASE_URL = apiServices.base_url;
  console.log("API URL:", import.meta.env.VITE_API_URL);
  console.log("BASE_URL:", BASE_URL);


  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  useEffect(() => {
    fetchAllTasks();
  }, [])

  const fetchAllTasks = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/tasks`);
      setTasks(response.data);
      // setFilteredTask(response.data);
    } catch (error) {
      console.error("Error fetching tasks", error);
    }
  }

  const saveTask = (newTask: Task) => {
    if (newTask.id) {
      updateUserTask(newTask);
    } else {
      const newTaskToAdd = {
        ...newTask,
        id: Math.random().toString(36).substr(2, 9),
      };
      saveUserTask(newTaskToAdd);
    }
    setTaskToEdit(null);
  };

  const updateUserTask = async (newTask: Task) => {
    try {
      await axios.put(`${BASE_URL}/tasks/${newTask.id}`, newTask);
      fetchAllTasks();
    } catch (error) {
      console.error("Error updating tasks", error);
    }
  }

  const saveUserTask = async (newTask: Task) => {
    try {
      await axios.post(`${BASE_URL}/tasks`, newTask);
      fetchAllTasks();
    } catch (error) {
      console.error("Error fetching tasks", error);
    }
  }

  const deleteTask = async (id: string) => {
    try {
      await axios.delete(`${BASE_URL}/tasks/${id}`);
      fetchAllTasks();
    } catch (error) {
      console.error("Error deleting tasks", error);
    }
  };

  return (
    <Router>
      <Header />
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
