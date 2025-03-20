import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    if (!email.includes("@")) {
      setError("Please include an '@'");
      return;
    }

    try {
      const usersRes = await axios.get("http://localhost:5000/users");
      const adminsRes = await axios.get("http://localhost:5000/admins");

      const user = usersRes.data.find(
        (u) => u.email === email && u.password === password
      );
      const admin = adminsRes.data.find(
        (a) => a.email === email && a.password === password
      );

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/user-dashboard");
      } else if (admin) {
        localStorage.setItem("admin", JSON.stringify(admin));
        navigate("/admin-dashboard");
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError("Network error. Please check server.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="info" onClick={handleLogin}>Login</button>
      <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
    </div>
  );
}

export default LoginPage;
