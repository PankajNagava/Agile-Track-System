import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./components/WelcomePage";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";
import UserDashboard from "./components/UserDashboard";
import AdminDashboard from "./components/AdminDashboard";
import ProfilePage from "./components/ProfilePage";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import UserHome from "./pages/UserHome";
import AdminHome from "./pages/AdminHome";
import { AuthProvider } from "./context/AuthContext";
import api from "./services/api";
import AddScrumForm from "./components/AddScrumForm";
import AddUserForm from "./components/AddUserForm";
import ScrumDetails from "./components/ScrumDetails";
import TaskStatusUpdate from "./components/TaskStatusUpdate";
import "./styles/App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user-home" element={<UserHome />} />
          <Route path="/admin-home" element={<AdminHome />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;