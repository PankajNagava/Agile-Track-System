import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function WelcomePage() {
  const [scrumTeams, setScrumTeams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch scrum teams from API
    axios.get("http://localhost:5000/scrumTeams")
      .then((res) => setScrumTeams(res.data))
      .catch((err) => console.error("Error fetching scrum teams:", err));
  }, []);

  return (
    <div className="welcome-container">
      <h1>Scrum Teams</h1>
      <ul>
        {scrumTeams.map((team) => (
          <li key={team.id}>
            <strong>{team.name}</strong>
            <button onClick={() => navigate("/login")}>Get Details</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WelcomePage;
