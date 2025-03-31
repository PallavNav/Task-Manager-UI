import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import TaskForm from "./components/TaskForm";
import TaskPage from "./components/TaskPage";
import TaskEditPage from "./components/TaskEditPage";
import TaskDetails from "./components/TaskDetails";
import Header from "./pages/Header";
import { apiServices } from "./services/service";
import { ConvertDate } from "./util/ConvertDate";
import Loader from "./pages/Loader";

import {
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

type Task = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: "Low" | "Medium" | "High";
  status: "Pending" | "Completed";
  isChecked: boolean;
};

function App() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '123',
      title: 'LocaL',
      description: 'local',
      dueDate: '2025/01/12',
      priority: "Low",
      status: "Pending",
      isChecked: false
    }
  ]);
  const BASE_URL = apiServices.base_url;
  const IS_LOCAL = apiServices.IS_LOCAL;
  console.log("API URL:", import.meta.env.VITE_API_URL);
  console.log("IS_LOCAL:", apiServices.IS_LOCAL);
  const navigate = useNavigate();
  const [displayLoader, setDisplayLoader] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  useEffect(() => {
    setDisplayLoader(true);
    fetchAllTasks();
  }, [])

  const fetchAllTasks = async (type?: any) => {
    try {
      let updatedTask: any;
      if (IS_LOCAL) {
        updatedTask = tasks.map((item: any) => ({ ...item, isChecked: false }));
      } else {
        const response = await axios.get(`${BASE_URL}/tasks`);
        updatedTask = response.data.map((item: any) => ({ ...item, isChecked: false }));
      }
      setTasks([...updatedTask]);
      if (type === 'CREATE') {
        alert('Task Created Successfully!');
        navigate('/');
      } else if (type === 'UPDATE') {
        alert('Task Updated Successfully!');
        navigate('/');
      }
      setDisplayLoader(false);
    } catch (error) {
      console.error("Error fetching tasks", error);
      setDisplayLoader(false);
    }
  }

  const saveTask = (newTask: Task) => {
    setDisplayLoader(true);
    if (newTask.id) {
      updateUserTask(newTask);
    } else {
      newTask.dueDate = ConvertDate(newTask.dueDate);
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
      newTask.dueDate = ConvertDate(newTask.dueDate);
      if (IS_LOCAL) {
        setTasks((prev: any) => prev.map((item: any) => (item.id === newTask.id) ? newTask : item));
        setDisplayLoader(false);
        alert('Task Updated Successfully!');
        navigate('/');
      } else {
        await axios.put(`${BASE_URL}/tasks/${newTask.id}`, newTask);
        fetchAllTasks('UPDATE');
      }
    } catch (error) {
      console.error("Error updating tasks", error);
      setDisplayLoader(false);
    }
  }

  const saveUserTask = async (newTask: Task) => {
    try {
      newTask.dueDate = ConvertDate(newTask.dueDate);
      if (IS_LOCAL) {
        setTasks((prev: Task[]) => {
          const updatedTask = [...prev, newTask];
          return updatedTask;
        });
        setDisplayLoader(false);
        alert('Task Created Successfully!');
        navigate('/');
      } else {
        await axios.post(`${BASE_URL}/tasks`, newTask);
        fetchAllTasks('CREATE');
      }
    } catch (error) {
      console.error("Error fetching tasks", error);
      setDisplayLoader(false);
    }
  }

  const deleteTask = async (id: string) => {
    const deleteConfirmation = window.confirm('Sure you want to delete this task?');
    if (deleteConfirmation) {
      try {
        if (IS_LOCAL) {
          setTasks((prev: Task[]) => {
            const nonDeletedRecords = prev.filter((item)=> item.id !== id);
            return nonDeletedRecords;
          });
          setDisplayLoader(false);
        } else {
          await axios.delete(`${BASE_URL}/tasks/${id}`);
          setDisplayLoader(true);
          fetchAllTasks();
        }
      } catch (error) {
        setDisplayLoader(false);
        console.error("Error deleting tasks", error);
      }
    }
  };

  const handleCheckBoxSelection = (id: string, value: boolean) => {
    console.log(tasks);
    setTasks((prev: any) => prev.map((item: any) => (item.id === id) ? { ...item, isChecked: value } : item));
  }

  const handleBulkDelete = () => {
    console.log(tasks);
    setTasks((prev: any) => prev.filter((item: any) => !item.isChecked));
  }

  const handleSelectAll = () => {
    const updatedTask = tasks.map((item: any) => ({ ...item, isChecked: !item.isChecked }));
    setTasks(updatedTask);
  }

  return (
    <>
      <Header />
      {displayLoader ? <Loader /> : (
        <Routes>
          <Route
            path="/"
            element={<TaskPage tasks={tasks} onDelete={deleteTask} checkBoxSelection={handleCheckBoxSelection} bulkDelete={handleBulkDelete} handleSelectAll={handleSelectAll} />}
          />
          <Route
            path="/tasks/new"
            element={<TaskForm onSave={saveTask} existingTask={taskToEdit} />}
          />
          <Route
            path="/tasks/:id"
            element={<TaskEditPage tasks={tasks} onSave={saveTask} />}
          />
          <Route
            path="/tasks/details/:id"
            element={<TaskDetails tasks={tasks}/>}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </>
  );
}

export default App;
