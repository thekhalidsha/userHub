import { Moon, Sun, Users, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useTheme } from '../../context/ThemeContext';

const Sidebar = ({ isOpen, closeSidebar, isCollapsed }) => {
  const location = useLocation();
  const { users, posts } = useData();
  const { theme, toggleTheme } = useTheme();

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-50 transition-all duration-300 overflow-hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${isCollapsed ? 'lg:w-20' : 'lg:w-64'} w-64`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-4 h-16 border-b border-gray-200 dark:border-gray-800 overflow-hidden">
            <Link 
              to="/" 
              className={`flex items-center gap-3 min-w-0 ${isCollapsed ? 'lg:justify-center lg:w-full' : ''}`}
              onClick={closeSidebar}
            >
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">UH</span>
              </div>

              {!isCollapsed && (
                <span className="font-bold text-lg text-gray-900 dark:text-white whitespace-nowrap transition-opacity duration-200 lg:delay-150">
                  UserHub
                </span>
              )}
            </Link>

            <button
              onClick={closeSidebar}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex-shrink-0"
            >
              <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-2 overflow-y-auto overflow-x-hidden">
            {!isCollapsed && (
              <h3 className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 whitespace-nowrap transition-opacity duration-200 lg:delay-150">
                Navigation
              </h3>
            )}

            <Link
              to="/"
              onClick={closeSidebar}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors overflow-hidden ${
                isActive('/')
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              } ${isCollapsed ? 'lg:justify-center' : ''}`}
              title={isCollapsed ? 'Users' : ''}
            >
              <Users className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && (
                <span className="font-medium whitespace-nowrap transition-opacity duration-200 lg:delay-150">
                  Users
                </span>
              )}
            </Link>
          </nav>

          {!isCollapsed && (
            <div className="p-4 border-t border-gray-200 dark:border-gray-800 animate-fadeIn">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-4 mb-4">
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Statistics
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600 dark:text-gray-400">Total Users</span>
                    <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                      {users.length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600 dark:text-gray-400">Total Posts</span>
                    <span className="text-sm font-bold text-purple-600 dark:text-purple-400">
                      {posts.length}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={toggleTheme}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Theme
                </span>
                <div className="flex items-center gap-2">
                  {theme === 'dark' ? (
                    <Moon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  ) : (
                    <Sun className="w-4 h-4 text-amber-600" />
                  )}
                </div>
              </button>
            </div>
          )}

          {isCollapsed && (
            <div className="hidden lg:block p-4  border-gray-200 dark:border-gray-800 animate-fadeIn">
              <button
                onClick={toggleTheme}
                className="w-full flex items-center justify-center p-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? (
                  <Moon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                ) : (
                  <Sun className="w-5 h-5 text-amber-600" />
                )}
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
