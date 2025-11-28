import React from 'react';

function AuthForm({ title, onSubmit, email, setEmail, password, setPassword, toggleMode, toggleText }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-xl w-96 border border-gray-200">
        <h2 className="text-3xl mb-6 font-bold text-center text-gray-800">{title}</h2>
        
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input 
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
              type="email"
              placeholder="you@example.com" 
              value={email} 
              onChange={e => setEmail(e.target.value)}
              required 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
              type="password" 
              placeholder="••••••••" 
              value={password} 
              onChange={e => setPassword(e.target.value)}
              required 
            />
          </div>

          <button className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition-colors shadow-md">
            {title}
          </button>
        </form>

        <p 
          className="mt-6 text-sm text-blue-600 hover:text-blue-800 cursor-pointer text-center hover:underline" 
          onClick={toggleMode}
        >
          {toggleText}
        </p>
      </div>
    </div>
  );
}
export default AuthForm;
