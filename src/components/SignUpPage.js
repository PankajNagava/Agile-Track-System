import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    setError("");

    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    if (!email.includes("@")) {
      setError("Please include an '@'");
      return;
    }

    try {
      const newUser = {
        name,
        email,
        password,
        role: "user"
      };

      await axios.post("http://localhost:5000/users", newUser);
      alert("User registered successfully!");
      navigate("/login");
    } catch (err) {
      console.error("SignUp Error:", err);
      setError("Network error. Try again later.");
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      {error && <p className="error">{error}</p>}
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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
      <button className="info" onClick={handleSignUp}>Sign Up</button>
    </div>
  );
}

export default SignUpPage;
