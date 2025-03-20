import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button className="info" onClick={() => navigate("/user-dashboard")}>
          Go to User Dashboard
        </button>
        <button className="info" onClick={() => navigate("/admin-dashboard")}>
          Go to Admin Dashboard
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
