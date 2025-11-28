import React from 'react';

function TodoItem({ todo, toggleTodo, deleteTodo }) {
  return (
    <li className="flex justify-between items-center border-b p-3 hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-3">
        {/* Controlled Checkbox Input */}
        <input 
          type="checkbox" 
          checked={todo.completed} 
          onChange={() => toggleTodo(todo._id, todo.completed)} 
          className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
        />
        
        {/* Conditional Styling for Completed Items */}
        <span className={`text-lg ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
          {todo.task}
        </span>
      </div>
      
      <button 
        onClick={() => deleteTodo(todo._id)} 
        className="text-red-500 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded transition-colors text-sm font-medium"
      >
        Delete
      </button>
    </li>
  );
}
export default TodoItem;
