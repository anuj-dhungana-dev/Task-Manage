import React from "react";
import Modal from "react-modal";
import { MdClose } from "react-icons/md";

const TaskModal = ({
  isOpen,
  onClose,
  type,
  title,
  setTitle,
  description,
  setDescription,
  priority,
  setPriority,
  onSubmit,
  error,
}) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={() => {}}
    style={{ overlay: { backgroundColor: "rgba(0,0,0,0.2)" } }}
    className="w-[90%] max-w-xl max-h-[90vh] bg-white rounded-md mx-auto mt-20 p-6 overflow-auto"
  >
    <div className="relative">
      <button
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        onClick={onClose}
      >
        <MdClose size={24} />
      </button>

      <h2 className="text-2xl font-semibold mb-4">
        {type === "edit" ? "Edit Task" : "Add Task"}
      </h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          rows="4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        ></textarea>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Priority
        </label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        >
          <option value="">Select priority</option>
          <option value="low" >Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      <button
        onClick={onSubmit}
        className="mt-4 bg-[#2B85FF] text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {type === "edit" ? "Update Task" : "Add Task"}
      </button>
    </div>
  </Modal>
);

export default TaskModal;
