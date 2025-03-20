import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [historyTasks, setHistoryTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "", role: "user" });
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const usersRes = await axios.get("http://localhost:5000/users");
    setUsers(usersRes.data);
  };

  const handleGetHistory = async (user) => {
    setSelectedUser(user);
    const tasksRes = await axios.get("http://localhost:5000/tasks");
    const userTasks = tasksRes.data.filter(task => task.assignedTo === user.id);
    setHistoryTasks(userTasks);
  };

  const handleAddUser = async () => {
    const { name, email, password, role } = newUser;
    if (!name || !email || !password || !role) {
      alert("All fields are required!");
      return;
    }
    if (!email.includes("@")) {
      alert("Please include an '@'");
      return;
    }
    await axios.post("http://localhost:5000/users", newUser);
    alert("User created successfully!");
    setShowForm(false);
    fetchUsers();
  };

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/login");
  };

  return (
    <div className="admin-profile-page">
      <h2>User Profiles</h2>
      <div>
        <button onClick={() => navigate("/admin-dashboard")}>Dashboard</button>
        <button onClick={() => navigate("/profile")}>Profiles</button>
         
      </div>

      <button onClick={() => setShowForm(!showForm)}>Add New User</button>

      {showForm && (
        <div className="add-user-form">
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          />
          <select
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            defaultValue="user"
          >
            <option value="user">Employee</option>
            <option value="admin">Admin</option>
          </select>
          <button onClick={handleAddUser}>Create User</button>
          <button onClick={() => setShowForm(false)}>Cancel</button>
        </div>
      )}

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong> - {user.email}
            <button onClick={() => handleGetHistory(user)}>Get History</button>
          </li>
        ))}
      </ul>

      {selectedUser && (
        <div className="user-history">
          <h3>Tasks Worked By {selectedUser.name}</h3>
          <ul>
            {historyTasks.map((task) => (
              <li key={task.id}>
                <strong>{task.title}</strong> - {task.description} ({task.status})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
