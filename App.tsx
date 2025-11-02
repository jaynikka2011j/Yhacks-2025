
import React from 'react';

const App: React.FC = () => {
  return (
    <main className="bg-gray-900 min-h-screen w-full flex flex-col items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
            Hello World!
          </span>
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-400">
          Welcome to your first React & Tailwind CSS application.
        </p>
      </div>
    </main>
  );
};

export default App;
