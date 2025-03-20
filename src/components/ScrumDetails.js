import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ScrumDetails() {
  const { id } = useParams();
  const [scrum, setScrum] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      const scrumRes = await axios.get(`http://localhost:5000/scrumTeams/${id}`);
      setScrum(scrumRes.data);

      const tasksRes = await axios.get("http://localhost:5000/tasks");
      const filteredTasks = tasksRes.data.filter(task => scrumRes.data.tasks.includes(task.id));
      setTasks(filteredTasks);

      const usersRes = await axios.get("http://localhost:5000/users");
      const filteredUsers = usersRes.data.filter(user => 
        filteredTasks.some(task => task.assignedTo === user.id)
      );
      setUsers(filteredUsers);
    };

    fetchDetails();
  }, [id]);

  if (!scrum) return <h2>Loading...</h2>;

  return (
    <div>
      <h2>Scrum Details for {scrum.name}</h2>
      <h3>Tasks:</h3>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>{task.title} - {task.description} ({task.status})</li>
        ))}
      </ul>
      <h3>Users:</h3>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default ScrumDetails;
