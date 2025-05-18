import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

export function Navbar() {
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Toggle theme function
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    // Here you would implement the actual theme change logic
    // For example, adding/removing a class from the document body or using a theme context
    document.body.classList.toggle('dark-theme');
  };
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return location.pathname.startsWith("/dashboard/");
    }
    return location.pathname === path;
  };

  return (
    <div className="h-14 bg-black flex items-center justify-between px-6">
      <div className="flex space-x-10">
        <Link
          to="/dashboard1"
          className={`text-white font-medium ${
            isActive("/dashboard") ? "text-blue-500" : ""
          }`}
        >
          Dashboard
        </Link>
        <Link
          to="/customers"
          className={`text-white font-medium ${
            isActive("/customers") ? "text-blue-500" : ""
          }`}
        >
          Customers
        </Link>
        <Link
          to="/invoices"
          className={`text-white font-medium ${
            isActive("/invoices") ? "text-blue-500" : ""
          }`}
        >
          Invoices
        </Link>
        <Link
          to="/reports"
          className={`text-white font-medium ${
            isActive("/reports") ? "text-blue-500" : ""
          }`}
        >
          Reports
        </Link>
        {isActive("/cases") ? (
          <></>
        ) : (
          <Link
            to="/"
            className={`text-white font-medium ${
              isActive("/") ? "text-blue-500" : ""
            }`}
          >
            Cases
          </Link>
        )}
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="text-white hover:text-blue-500 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
        
        <div className="relative" ref={dropdownRef}>
          <button 
            className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-700 text-white hover:bg-gray-600 focus:outline-none"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </button>
          
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
              <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                <p className="font-medium">User Profile</p>
                <p className="text-xs text-gray-500">user@example.com</p>
              </div>
              
              <button 
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={toggleTheme}
              >
                {isDarkTheme ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                      <circle cx="12" cy="12" r="5"></circle>
                      <line x1="12" y1="1" x2="12" y2="3"></line>
                      <line x1="12" y1="21" x2="12" y2="23"></line>
                      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                      <line x1="1" y1="12" x2="3" y2="12"></line>
                      <line x1="21" y1="12" x2="23" y2="12"></line>
                      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                    </svg> Light Theme
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    </svg> Dark Theme
                  </>
                )}
              </button>
              
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Settings
              </button>
              
              <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
