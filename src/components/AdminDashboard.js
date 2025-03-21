import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TaskStatusUpdate from "./TaskStatusUpdate";
import "../styles/AdminDashboard.css"; // Ensure CSS file import

function AdminDashboard() {
  const [scrumTeams, setScrumTeams] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [showScrumForm, setShowScrumForm] = useState(false);
  const [scrumName, setScrumName] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [taskStatus, setTaskStatus] = useState("To Do");
  const [assignTo, setAssignTo] = useState("");
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [teamTasks, setTeamTasks] = useState([]);
  const [teamUsers, setTeamUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const scrumRes = await axios.get("http://localhost:5000/scrumTeams");
      const usersRes = await axios.get("http://localhost:5000/users");
      setScrumTeams(scrumRes.data);
      setUsers(usersRes.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const handleAddScrum = async () => {
    if (!scrumName || !taskTitle || !taskDesc || !assignTo) {
      alert("All fields are required!");
      return;
    }

    try {
      const newTask = {
        title: taskTitle,
        description: taskDesc,
        status: taskStatus,
        assignedTo: parseInt(assignTo)
      };

      const taskRes = await axios.post("http://localhost:5000/tasks", newTask);

      const newScrum = {
        name: scrumName,
        tasks: [taskRes.data.id]
      };

      await axios.post("http://localhost:5000/scrumTeams", newScrum);

      alert("Scrum created successfully!");
      setShowScrumForm(false);
      fetchData();
    } catch (err) {
      console.error("Add Scrum Error:", err);
    }
  };

  const handleGetDetails = async (team) => {
    setSelectedTeam(team);
    try {
      const tasksRes = await axios.get("http://localhost:5000/tasks");
      const teamTaskList = tasksRes.data.filter(task => team.tasks.includes(task.id));
      setTeamTasks(teamTaskList);

      const teamUserList = users.filter(user =>
        teamTaskList.some(task => task.assignedTo === user.id)
      );
      setTeamUsers(teamUserList);
    } catch (err) {
      console.error("Error fetching details:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/login");
  };

  return (
    <div className="admin-dashboard">
      <h2>Scrum Teams</h2>

      <button onClick={() => setShowScrumForm(!showScrumForm)}>Add New Scrum</button>

      {showScrumForm && (
        <div className="scrum-form">
          <input type="text" placeholder="Scrum Name" onChange={(e) => setScrumName(e.target.value)} />
          <input type="text" placeholder="Task Title" onChange={(e) => setTaskTitle(e.target.value)} />
          <input type="text" placeholder="Task Description" onChange={(e) => setTaskDesc(e.target.value)} />
          <select onChange={(e) => setTaskStatus(e.target.value)}>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
          <select onChange={(e) => setAssignTo(e.target.value)}>
            <option value="">Assign To</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
          <button onClick={handleAddScrum}>Create Scrum</button>
          <button onClick={() => setShowScrumForm(false)}>Cancel</button>
        </div>
      )}

      <ul className="scrum-list">
        {scrumTeams.map((team) => (
          <li key={team.id} className="scrum-item">
            <span className="scrum-name">{team.name}</span>
            <button className="details-button" onClick={() => handleGetDetails(team)}>Get Details</button>
          </li>
        ))}
      </ul>

      {selectedTeam && (
        <div className="scrum-details">
          <h3>Scrum Details for {selectedTeam.name}</h3>

          <h4>Tasks:</h4>
          <ul>
            {teamTasks.map((task) => (
              <li key={task.id}>
                <strong>{task.title}</strong> - {task.description} 
                <TaskStatusUpdate taskId={task.id} currentStatus={task.status} />
              </li>
            ))}
          </ul>

          <h4>Users:</h4>
          <ul>
            {teamUsers.map((user) => (
              <li key={user.id}>{user.name} - {user.email}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
