import { useState } from 'react';
import TodoItem from '../components/TodoItem';

function Dashboard({ todos, addTodo, toggleTodo, deleteTodo, logout }) {
  const [newTask, setNewTask] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return; // Prevent adding empty tasks
    addTodo(newTask);
    setNewTask('');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        
        {/* Header Section */}
        <div className="bg-blue-600 p-6 flex justify-between items-center text-white">
          <h1 className="text-2xl font-bold tracking-wide">My Tasks</h1>
          <button 
            onClick={logout} 
            className="text-sm bg-blue-800 hover:bg-blue-900 px-4 py-2 rounded transition-colors shadow-sm"
          >
            Logout
          </button>
        </div>
        
        <div className="p-6">
          {/* Add Todo Form */}
          <form onSubmit={handleSubmit} className="flex gap-3 mb-6">
            <input 
              className="flex-1 border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
              placeholder="What needs to be done today?" 
              value={newTask} 
              onChange={e => setNewTask(e.target.value)} 
            />
            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded font-semibold shadow-md transition-colors">
              Add
            </button>
          </form>

          {/* Todo List */}
          <ul className="space-y-1">
            {todos.map(todo => (
              <TodoItem 
                key={todo._id} // Unique key is critical for React rendering performance
                todo={todo} 
                toggleTodo={toggleTodo} 
                deleteTodo={deleteTodo} 
              />
            ))}
            
            {todos.length === 0 && (
              <div className="text-center py-10">
                 <p className="text-gray-400 text-lg">No tasks yet. Add one above!</p>
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
