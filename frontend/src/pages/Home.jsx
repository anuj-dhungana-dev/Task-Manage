import React, { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { signInSuccess } from "../redux/user/userSlice";

import Header from "../components/Header";
import TaskCard from "../components/TaskCard";
import TaskModal from "../components/TaskModal";

const Home = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [allTask, setAllTask] = useState([]);
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    } else {
      getAllTask();
    }
  }, []);

  const getAllTask = async () => {
    try {
      const res = await axios.get("http://localhost:8000/v1/api/task", {
        withCredentials: true,
      });
      if (res.data.success) {
        setAllTask(res?.data?.tasks);
      }
    } catch (error) {
      console.log(error.message);
      // toast.error("Failed to fetch tasks.");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:8000/v1/api/auth/logout", {
        withCredentials: true,
      });
      dispatch(signInSuccess(null));
      navigate("/login");
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  const handleEdit = (task) => {
    setTitle(task.title);
    setDescription(task.description);
    setPriority(task.priority);
    setOpenAddEditModal({ isShown: true, data: task, type: "edit" });
  };

  const deleteTask = async (task) => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/v1/api/task/${task.id}`,
        { withCredentials: true }
      );

      if (!res.data.success) {
        toast.error(res.data.message);
        return;
      }

      toast.success(res.data.message);
      setAllTask((prev) => prev.filter((t) => t.id !== task.id));
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSubmit = async () => {
    if (!title) return setError("Please enter the title");
    if (!description) return setError("Please enter the description");
    setError("");

    try {
      let res;
      if (openAddEditModal.type === "edit") {
        res = await axios.put(
          `http://localhost:8000/v1/api/task/${openAddEditModal.data.id}`,
          { title, description, priority },
          { withCredentials: true }
        );
      } else {
        res = await axios.post(
          "http://localhost:8000/v1/api/task",
          { title, description, priority },
          { withCredentials: true }
        );
      }

      if (!res.data.success) {
        toast.error(res.data.message);
        return;
      }

      toast.success(res.data.message);
      getAllTask();
      setOpenAddEditModal({ isShown: false, type: "add", data: null });
      setTitle("");
      setDescription("");
      setPriority("");
    } catch (error) {
      toast.error(error.message);
      setError(error.message);
    }
  };

  return (
    <div className="p-6 relative">
      <Header onLogout={handleLogout} />

      {allTask.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allTask.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onEdit={handleEdit}
              onDelete={deleteTask}
            />
          ))}
        </div>
      ) : (
        <div className="text-center mt-10 text-gray-600">
          <h3 className="text-xl font-semibold mb-2">No tasks yet</h3>
          <p className="text-sm">
            You haven’t added any tasks. Click the{" "}
            <span className="text-[#2B85FF] font-semibold text-base">‘+’</span>{" "}
            button to create one.
          </p>
        </div>
      )}

      <button
        className="w-16 h-16 flex items-center justify-center rounded-full bg-[#2B85FF] hover:bg-blue-600 text-white text-3xl fixed right-10 bottom-10"
        onClick={() => {
          setTitle("");
          setDescription("");
          setPriority("");
          setOpenAddEditModal({ isShown: true, type: "add", data: null });
        }}
      >
        <MdAdd />
      </button>

      <TaskModal
        isOpen={openAddEditModal.isShown}
        onClose={() =>
          setOpenAddEditModal({ isShown: false, type: "add", data: null })
        }
        type={openAddEditModal.type}
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        priority={priority}
        setPriority={setPriority}
        onSubmit={handleSubmit}
        error={error}
      />
    </div>
  );
};

export default Home;
