import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const admin = JSON.parse(localStorage.getItem("admin"));

  const handleLogout = () => {
    if (user) {
      localStorage.removeItem("user");
    } else if (admin) {
      localStorage.removeItem("admin");
    }
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <span className="logo">AgileTrack</span>
        {user && (
          <>
            <Link to="/user-dashboard" className="button-primary">Dashboard</Link>
            <Link to="/profile" className="button-primary">Profiles</Link>
          </>
        )}
        {admin && (
          <>
            <Link to="/admin-dashboard" className="button-primary">Dashboard</Link>
            <Link to="/profile" className="button-primary">Profiles</Link>
          </>
        )}
      </div>

      {(user || admin) && (
        <div className="nav-right">
          <button className="button-danger" onClick={handleLogout}>Logout</button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
