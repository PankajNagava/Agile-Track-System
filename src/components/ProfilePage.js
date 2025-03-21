import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/ProfilePage.css'; // Ensure you import the CSS file

function ProfilePage() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [historyTasks, setHistoryTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'user' });
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const usersRes = await axios.get('http://localhost:5000/users');
      setUsers(usersRes.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleGetHistory = async (user) => {
    setSelectedUser(user);
    try {
      const tasksRes = await axios.get('http://localhost:5000/tasks');
      const userTasks = tasksRes.data.filter(task => task.assignedTo === user.id);
      setHistoryTasks(userTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleAddUser = async () => {
    const { name, email, password, role } = newUser;
    if (!name || !email || !password || !role) {
      alert('All fields are required!');
      return;
    }
    if (!email.includes('@')) {
      alert("Please include an '@' in the email address.");
      return;
    }
    try {
      await axios.post('http://localhost:5000/users', newUser);
      alert('User created successfully!');
      setShowForm(false);
      fetchUsers();
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin');
    navigate('/login');
  };

  return (
    <div className="admin-profile-page">
      <h2>User Profiles</h2>
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

      <ul className="user-list">
        {users.map((user) => (
          <li key={user.id} className="user-item">
            <div className="user-info">
              <span>
                <strong>{user.name}</strong> - {user.email}
              </span>
              <button className="get-history-btn" onClick={() => handleGetHistory(user)}>
                Get History
              </button>
            </div>
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
