import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Leaf, FileSearch, Home } from 'lucide-react';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-earthy-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="bg-earthy-100 p-2 rounded-xl group-hover:bg-earthy-200 transition-colors">
                  <Leaf className="h-6 w-6 text-earthy-600" />
                </div>
                <span className="text-xl font-bold text-gray-900 tracking-tight">
                  SmartSubsidy <span className="text-earthy-600">AI</span>
                </span>
              </Link>
            </div>
            
            <nav className="flex items-center space-x-4">
              <Link to="/" className="text-gray-500 hover:text-earthy-600 px-3 py-2 rounded-lg hover:bg-earthy-50 transition-all text-sm font-medium flex items-center gap-2">
                <Home className="w-4 h-4"/>
                Home
              </Link>
              <Link to="/decoder" className="text-gray-500 hover:text-earthy-600 px-3 py-2 rounded-lg hover:bg-earthy-50 transition-all text-sm font-medium flex items-center gap-2">
                <FileSearch className="w-4 h-4"/>
                Track Status
              </Link>
            </nav>
          </div>
        </div>
      </header>
      
      <main className="flex-1 w-full relative">
        <Outlet />
      </main>
      
      <footer className="bg-white border-t border-earthy-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
          <p>Mock MVP - SmartSubsidy AI Hackathon Demo</p>
        </div>
      </footer>
    </div>
  );
}
