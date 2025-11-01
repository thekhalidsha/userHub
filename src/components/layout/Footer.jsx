import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="px-4 lg:px-6 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
          </div>
          <div className="flex items-center gap-1">
            <span>by</span>
            <span className="font-medium text-gray-900 dark:text-white">Mohammed Khalid</span>
          </div>
          <div className="flex items-center gap-1">
            <span>for</span>
            <span className="font-medium text-gray-900 dark:text-white">InfinityHub</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
