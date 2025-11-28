import { useState, useEffect } from 'react';
import axios from 'axios';
import AuthForm from './components/AuthForm';
import Dashboard from './pages/Dashboard';

// Set base URL for cleaner calls. Ideally, this URL should be in an .env file.
const API = axios.create({ baseURL: 'http://localhost:5000/api' });

function App() {
  // --- STATE MANAGEMENT ---
  // We use localStorage to persist the token so the user stays logged in on refresh.
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [todos, setTodos] = useState([]);
  
  // Auth Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  // Helper object to attach the Authorization header to every request
  const config = { headers: { Authorization: token } };

  // --- EFFECT HOOKS ---
  
  // This hook runs whenever the 'token' variable changes.
  // If a token exists, we immediately try to fetch the user's data.
  useEffect(() => {
    if (token) fetchTodos();
  }, [token]);

  // --- API FUNCTIONS ---

  const fetchTodos = async () => {
    try {
      const res = await API.get('/todos', config);
      setTodos(res.data);
    } catch (err) {
      // If we get a 403 (Forbidden), it means our token is invalid/expired.
      // We force a logout to clean up the state.
      console.error("Error fetching todos:", err);
      if(err.response?.status === 403 || err.response?.status === 401) logout();
    }
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    const endpoint = isRegistering ? '/auth/signup' : '/auth/login';
    try {
      const res = await API.post(endpoint, { email, password });
      
      if (!isRegistering) {
        // Login successful: Save token and update state
        localStorage.setItem('token', res.data.token);
        setToken(res.data.token);
      } else {
        // Registration successful: Switch to login mode
        alert("Registration successful! Please login.");
        setIsRegistering(false);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Authentication failed");
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setTodos([]);
    setEmail('');
    setPassword('');
  };

  const addTodo = async (task) => {
    try {
      const res = await API.post('/todos', { task }, config);
      // Optimistic UI: We append the new todo to the existing list instantly
      setTodos([...todos, res.data]); 
    } catch (err) {
      console.error(err);
    }
  };

  const toggleTodo = async (id, completed) => {
    try {
      const res = await API.put(`/todos/${id}`, { completed: !completed }, config);
      // Map through todos: find the one that changed, replace it with the server response
      setTodos(todos.map(t => t._id === id ? res.data : t));
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await API.delete(`/todos/${id}`, config);
      // Filter out the deleted todo from the state
      setTodos(todos.filter(t => t._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // --- CONDITIONAL RENDERING ---

  // If no token exists, show the Authentication Flow
  if (!token) {
    return (
      <AuthForm 
        title={isRegistering ? 'Sign Up' : 'Login'}
        onSubmit={handleAuth}
        email={email} setEmail={setEmail}
        password={password} setPassword={setPassword}
        toggleMode={() => setIsRegistering(!isRegistering)}
        toggleText={isRegistering ? 'Already have an account? Login' : 'Need an account? Sign Up'}
      />
    );
  }

  // If token exists, show the Main Dashboard
  return (
    <Dashboard 
      todos={todos} 
      addTodo={addTodo} 
      toggleTodo={toggleTodo} 
      deleteTodo={deleteTodo} 
      logout={logout}
    />
  );
}

export default App;
