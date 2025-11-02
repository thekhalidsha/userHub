import { memo } from 'react';
import { Building2, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UserCard = memo(({ user }) => {
  const navigate = useNavigate();

  
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div
      onClick={() => navigate(`/user/${user.id}`)}
      className="bg-white transition-colors duration-500 delay-250 hover:bg-gradient-to-tr from-white from-70%  to-purple-100 to-100% dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 hover:shadow-lg hover:scale-[1.02] transition-all cursor-pointer"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
          {getInitials(user.name)}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-lg text-gray-900 dark:text-white truncate">
            {user.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
            @{user.username}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <Mail className="w-4 h-4 flex-shrink-0" />
          <span className="truncate">{user.email}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <Building2 className="w-4 h-4 flex-shrink-0" />
          <span className="truncate">{user.company.name}</span>
        </div>
      </div>
    </div>
  );
});

UserCard.displayName = 'UserCard';

export default UserCard;
