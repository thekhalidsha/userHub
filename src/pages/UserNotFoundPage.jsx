import { Home, UserX } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';

const UserNotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-100 dark:bg-red-900/20 mb-6">
            <UserX className="w-12 h-12 text-red-600 dark:text-red-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            User Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            The user you're looking for doesn't exist or may have been removed.
          </p>
        </div>
        <Button variant="primary" icon={Home} onClick={() => navigate('/')}>
          Back to Users
        </Button>
      </div>
    </div>
  );
};

export default UserNotFoundPage;
