import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const TaskCard = ({ task, onEdit, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const description = task.description;

  // Limit description to first 100 characters
  const truncatedDescription = description.slice(0, 100);

  return (
    <div className="border rounded p-4 shadow bg-white">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{task.title}</h2>
        <span
          className={`text-sm rounded-full p-2 w-20 text-center uppercase ${
            task.priority === "high"
              ? "bg-red-500 text-white"
              : task.priority === "medium"
              ? "bg-yellow-500 text-white"
              : task.priority === "low"
              ? "bg-green-500 text-white"
              : "bg-gray-300 text-gray-700"
          }`}
        >
          {task.priority}
        </span>
      </div>
      <p className="mt-2 text-sm text-gray-700">
        {isExpanded ? description : `${truncatedDescription}...`}
        {description.length > 100 && (
          <span
            onClick={toggleDescription}
            className="text-blue-500 cursor-pointer ml-2"
          >
            {isExpanded ? "See less" : "See more"}
          </span>
        )}
      </p>
      <div className="mt-4 flex gap-2">
        <button onClick={() => onEdit(task)} className="text-blue-600 ">
          <FaRegEdit className="text-3xl" />
        </button>
        <button onClick={() => onDelete(task)} className="text-red-500">
          <MdDelete className="text-3xl" />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
