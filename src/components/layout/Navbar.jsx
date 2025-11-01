import { Menu, PanelLeftClose, PanelLeft, Keyboard, Calendar, Github, PanelLeftOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Navbar = ({ toggleSidebar, isCollapsed, toggleCollapse }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showShortcuts, setShowShortcuts] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentTime.toLocaleDateString('en-IN', { 
    month: 'short', 
    day: 'numeric'
  });

  const formattedTime = currentTime.toLocaleTimeString('en-IN', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true
  });

  return (
    <nav className={`fixed top-0 right-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 transition-all duration-300 ${
      isCollapsed ? 'lg:left-20' : 'lg:left-64'
    } left-0`}>
      <div className="px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle sidebar"
            >
              <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>

            <button
              onClick={toggleCollapse}
              className="hidden lg:flex p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle sidebar collapse"
              title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {isCollapsed ? (
                <PanelLeftOpen className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <PanelLeftClose className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              )}
            </button>

            <Link to="/" className="flex items-center gap-2 lg:hidden">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">UH</span>
              </div>
              <span className="font-bold text-xl text-gray-900 dark:text-white">
                UserHub
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                {formattedDate}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-500">•</span>
              <span className="text-xs text-gray-600 dark:text-gray-400">
                {formattedTime}
              </span>
            </div>

            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="View on GitHub"
            >
              <Github className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </a>

            <button
              onClick={() => setShowShortcuts(!showShortcuts)}
              className="hidden sm:flex p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative"
              title="Keyboard shortcuts"
            >
              <Keyboard className="w-5 h-5 text-gray-600 dark:text-gray-300" />

              {showShortcuts && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 z-50">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">
                    Keyboard Shortcuts
                  </h3>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Search</span>
                      <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-gray-700 dark:text-gray-300">
                        Ctrl + K
                      </kbd>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Toggle Sidebar</span>
                      <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-gray-700 dark:text-gray-300">
                        Ctrl + B
                      </kbd>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Toggle Theme</span>
                      <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-gray-700 dark:text-gray-300">
                        Ctrl + T
                      </kbd>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Close Modal</span>
                      <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-gray-700 dark:text-gray-300">
                        Esc
                      </kbd>
                    </div>
                  </div>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>

      {showShortcuts && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowShortcuts(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
