import { useEffect, useState } from "react";
import { addTask, addScrum, getUsers } from "../services/api";

function AddScrumForm({ onSuccess }) {
  const [scrumName, setScrumName] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [taskStatus, setTaskStatus] = useState("To Do");
  const [assignTo, setAssignTo] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!scrumName || !taskTitle || !taskDesc || !assignTo) {
      alert("All fields are required!");
      return;
    }

    const taskData = { title: taskTitle, description: taskDesc, status: taskStatus, assignedTo: parseInt(assignTo) };
    const createdTask = await addTask(taskData);

    const scrumData = { name: scrumName, tasks: [createdTask.id] };
    await addScrum(scrumData);

    alert("Scrum and Task added!");
    onSuccess(); // Refresh dashboard
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Scrum Name" onChange={(e) => setScrumName(e.target.value)} />
      <input type="text" placeholder="Task Title" onChange={(e) => setTaskTitle(e.target.value)} />
      <input type="text" placeholder="Task Description" onChange={(e) => setTaskDesc(e.target.value)} />
      <select onChange={(e) => setTaskStatus(e.target.value)} defaultValue="To Do">
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
      <select onChange={(e) => setAssignTo(e.target.value)} defaultValue="">
        <option value="">Assign To</option>
        {users.map(user => (
          <option key={user.id} value={user.id}>{user.name}</option>
        ))}
      </select>
      <button type="submit">Create Scrum</button>
    </form>
  );
}

export default AddScrumForm;
