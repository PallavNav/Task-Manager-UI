import "../styles/TaskDetails.css";
import { ConvertDate } from "../util/ConvertDate";
import { useState, useEffect } from "react";
import { apiServices } from "../services/service";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../pages/Loader";

type TaskDetailsProps = {
    tasks: Task[];
};

type Task = {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    priority: "Low" | "Medium" | "High";
    status: "Pending" | "Completed";
};

const TaskDetails = ({tasks}:any) => {
    const navigate = useNavigate();
    const IS_LOCAL = apiServices.IS_LOCAL;
    const { id } = useParams<{ id: string }>();
    const [taskDetails, setTaskDetails] = useState<any>([]);
    const [displayLoader, setDisplayLoader] = useState<boolean>(false);
    const BASE_URL = apiServices.base_url;

    useEffect(() => {
        setDisplayLoader(true);
        getTaskDetails();
    }, []);

    const getTaskDetails = async () => {
        try {
            if (IS_LOCAL) {
                console.log(tasks);
                const taskToShow:any = tasks.find((item:any)=> item.id === id);
                setTaskDetails(taskToShow);
              } else {
                const response = await axios.get(`${BASE_URL}/tasks/${id}`);
                response.data.dueDate = ConvertDate(response.data.dueDate);
                setTaskDetails(response.data);
              }
              setDisplayLoader(false);
        } catch (error) {
            console.error("Error fetching tasks", error);
            setDisplayLoader(false);
        }
    }

    const handleBack = () => {
        navigate("/");
    };

    return (
        <>
            <div className="task-details">
                {!displayLoader? (<div className="task-info">
                    <p><strong>Title:</strong> {taskDetails.title}</p>
                    <p><strong>Description:</strong> {taskDetails.description}</p>
                    <p><strong>Due Date:</strong> {taskDetails.dueDate}</p>
                    <p><strong>Priority:</strong> <span className={`priority-${taskDetails?.priority?.toLowerCase()}`}>{taskDetails?.priority}</span></p>
                    <p><strong>Status:</strong> <span className={`status-${taskDetails?.status?.toLowerCase()}`}>{taskDetails?.status}</span></p>
                    <button type="button" onClick={handleBack} className="edit-button back-btn">
                        Manage Tasks
                    </button>
                </div>) : (<Loader />)}

            </div>

        </>


    );
};

export default TaskDetails;
