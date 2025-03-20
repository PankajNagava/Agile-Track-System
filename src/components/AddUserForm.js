import { useState } from "react";
import { addUser } from "../services/api";

function AddUserForm({ onSuccess }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      alert("All fields required!");
      return;
    }
    if (!email.includes("@")) {
      alert("Please include an '@'");
      return;
    }

    await addUser({ name, email, password, role });
    alert("User created!");
    onSuccess(); // Refresh user list
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <select onChange={(e) => setRole(e.target.value)} defaultValue="user">
        <option value="user">Employee</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit">Create User</button>
    </form>
  );
}

export default AddUserForm;
