import React from 'react';
import Home from './pages/Home';
import ContactMe from './pages/ContactMe';
import ThemeToggle from './components/ThemeToggle';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col gap-8 items-center justify-center p-6">
      <ThemeToggle />
      <div className="w-full max-w-6xl bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-600 dark:text-yellow-500 mb-10 text-center">
          Apple Financial Data Viewer
        </h1>
        <Home />
      </div>
      <div className="w-full max-w-4xl">
        <ContactMe />
      </div>
    </div>
  );
}

export default App;
