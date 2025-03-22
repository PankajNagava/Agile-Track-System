import { useState } from "react";
import { updateTaskStatus } from "../services/api";

function TaskStatusUpdate({ taskId, currentStatus }) {
  const [status, setStatus] = useState(currentStatus);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    try {
      await updateTaskStatus(taskId, newStatus);
      alert("Task status updated successfully!");
    } catch (err) {
      console.error("Status Update Error:", err);
      alert("Failed to update status.");
    }
  };

  return (
    <select value={status} onChange={handleStatusChange}>
      <option value="To Do">To Do</option>
      <option value="In Progress">In Progress</option>
      <option value="Done">Done</option>
    </select>
  );
}

export default TaskStatusUpdate;
