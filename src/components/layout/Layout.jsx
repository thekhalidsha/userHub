import { useState, useEffect, useCallback } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { useTheme } from '../../context/ThemeContext';

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const { toggleTheme } = useTheme();

  const toggleSidebar = () => {setIsSidebarCollapsed(false); setIsSidebarOpen(!isSidebarOpen)};
  const closeSidebar = () => setIsSidebarOpen(false);
  const toggleCollapse = useCallback(() => {
    setIsSidebarCollapsed(prev => !prev);
  }, []);

  useEffect(() => {
    closeSidebar();
  }, [children]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('input[type="text"]');
        if (searchInput) searchInput.focus();
      }

      if (e.key === 'Escape') {
        closeSidebar();
      }

      if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        if (window.innerWidth >= 1024) { 
          setIsSidebarCollapsed(prev => {
            console.log('Toggling sidebar:', prev ? 'Expanding' : 'Collapsing');
            return !prev;
          });
        }
      }

      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault();
        toggleTheme();
        console.log('Theme toggled via keyboard shortcut');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [toggleTheme]); 

  return (
    <div className="min-h-screen bg-gray-50 bg-linear-to-tr from-gray-50 from-70% to-purple-100 dark:bg-gray-950 flex flex-col">
      <Navbar 
        toggleSidebar={toggleSidebar}
        isCollapsed={isSidebarCollapsed}
        toggleCollapse={toggleCollapse}
      />
      <Sidebar 
        isOpen={isSidebarOpen} 
        closeSidebar={closeSidebar}
        isCollapsed={isSidebarCollapsed}
      />

      <main className={`flex-1 mt-16 p-4 lg:p-6 transition-all duration-300 ${
        isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'
      }`}>
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
