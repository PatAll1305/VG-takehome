import Home from './pages/Home';
import ContactMe from './pages/ContactMe'
import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row gap-8 w-full items-center justify-center p-6">
      <div className=" w-full md:w-3/4 bg-white shadow-lg mb-10 rounded-lg p-8 w-full max-w-6xl">
        <h1 className="text-5xl font-extrabold mb-10 text-blue-600">
          Apple Financial Data Viewer
        </h1>
        <Home />
      </div>
      <ContactMe />
    </div>
  );
}

export default App;
