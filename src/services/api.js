import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

// Fetch all users
export const getUsers = async () => {
  const response = await axios.get(`${API_BASE_URL}/users`);
  return response.data;
};

// Fetch all admins
export const getAdmins = async () => {
  const response = await axios.get(`${API_BASE_URL}/admins`);
  return response.data;
};

// Fetch scrum teams
export const getScrumTeams = async () => {
  const response = await axios.get(`${API_BASE_URL}/scrumTeams`);
  return response.data;
};

// Fetch tasks
export const getTasks = async () => {
  const response = await axios.get(`${API_BASE_URL}/tasks`);
  return response.data;
};

// Add new user
export const addUser = async (userData) => {
  const response = await axios.post(`${API_BASE_URL}/users`, userData);
  return response.data;
};

// Add new scrum
export const addScrum = async (scrumData) => {
  const response = await axios.post(`${API_BASE_URL}/scrumTeams`, scrumData);
  return response.data;
};

// Add new task  ✅ FIXED
export const addTask = async (taskData) => {
  const response = await axios.post(`${API_BASE_URL}/tasks`, taskData);
  return response.data;
};

// Update task status
export const updateTaskStatus = async (taskId, status) => {
  const response = await axios.patch(`${API_BASE_URL}/tasks/${taskId}`, { status });
  return response.data;
};

// Export all
export default {
  getUsers,
  getAdmins,
  getScrumTeams,
  getTasks,
  addUser,
  addScrum,
  addTask, 
  updateTaskStatus,
};
