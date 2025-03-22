import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserDashboard() {
  const [scrumTeams, setScrumTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios.get("http://localhost:5000/scrumTeams")
      .then((res) => setScrumTeams(res.data))
      .catch((err) => console.error("Error fetching scrums:", err));
  }, []);

  const handleGetDetails = async (team) => {
    setSelectedTeam(team);

    // Fetch tasks and users for this team
    try {
      const tasksRes = await axios.get("http://localhost:5000/tasks");
      const teamTasks = tasksRes.data.filter(task => team.tasks.includes(task.id));
      setTasks(teamTasks);

      const usersRes = await axios.get("http://localhost:5000/users");
      const teamUsers = usersRes.data.filter(user => teamTasks.some(task => task.assignedTo === user.id));
      setUsers(teamUsers);
    } catch (err) {
      console.error("Error loading details:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="user-dashboard">
      <h2>Scrum Teams</h2>
       

      <ul>
        {scrumTeams.map((team) => (
          <li key={team.id}>
            <strong>{team.name}</strong>
            <button onClick={() => handleGetDetails(team)}>Get Details</button>
          </li>
        ))}
      </ul>

      {selectedTeam && (
        <div className="scrum-details">
          <h3>Scrum Details for {selectedTeam.name}</h3>

          <h4>Tasks:</h4>
          <ul>
            {tasks.map((task) => (
              <li key={task.id}>
                <strong>{task.title}</strong> - {task.description} ({task.status})
              </li>
            ))}
          </ul>

          <h4>Users:</h4>
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                {user.name} - {user.email}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default UserDashboard;
