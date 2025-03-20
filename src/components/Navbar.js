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
    <nav style={styles.navbar}>
      <div style={styles.logo}>
        {/* Placeholder logo text */}
        <span style={styles.logoText}>AgileTrack</span>
      </div>

      <ul style={styles.navList}>
        {!user && !admin && (
          <>
            <li><Link to="/" style={styles.link}>Welcome</Link></li>
            <li><Link to="/login" style={styles.link}>Login</Link></li>
          </>
        )}

        {user && (
          <>
            
            <li><button onClick={handleLogout} style={styles.logoutBtn}>Logout</button></li>
          </>
        )}

        {admin && (
          <>
             <li><button onClick={handleLogout} style={styles.logoutBtn}>Logout</button></li>
          </>
        )}
      </ul>
    </nav>
  );
}

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    padding: '10px 20px',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
  },
  logoText: {
    color: '#fff',
    fontSize: '20px',
    fontWeight: 'bold',
  },
  navList: {
    listStyle: 'none',
    display: 'flex',
    gap: '15px',
    margin: 0,
    padding: 0,
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    padding: '8px 12px',
    backgroundColor: '#4CAF50',
    borderRadius: '4px',
  },
  logoutBtn: {
    padding: '8px 12px',
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  }
};

export default Navbar;
