import { useState, useMemo } from 'react';
import { Users as UsersIcon } from 'lucide-react';
import UserCard from '../components/user/UserCard';
import UserSkeleton from '../components/user/UserSkeleton';
import SearchBar from '../components/common/SearchBar';
import EmptyState from '../components/common/EmptyState';
import LoadMorePagination from '../components/common/LoadMorePagination';
import { useData } from '../context/DataContext';

const HomePage = () => {
  const { users, loading, error } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(9);

  const filteredUsers = useMemo(() => {
    if (!searchQuery) return users;

    const query = searchQuery.toLowerCase();
    return users.filter(user =>
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.company.name.toLowerCase().includes(query)
    );
  }, [users, searchQuery]);

  const displayedUsers = useMemo(() => {
    return searchQuery ? filteredUsers : filteredUsers.slice(0, visibleCount);
  }, [filteredUsers, searchQuery, visibleCount]);

  const hasMore = !searchQuery && visibleCount < filteredUsers.length;

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 4);
  };

  if (loading.users) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          All Users
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(9)].map((_, i) => (
            <UserSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error.users) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 dark:text-red-400 text-lg">{error.users}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          All Users
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Browse all users
        </p>
      </div>

      <div className="mb-6">
        <SearchBar
          onSearch={setSearchQuery}
          placeholder="Search by name, email, or company..."
        />
      </div>

      {filteredUsers.length === 0 ? (
        <EmptyState
          icon={UsersIcon}
          title="No users found"
          description="Try adjusting your search query"
        />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedUsers.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>

          {hasMore && (
            <LoadMorePagination
              currentCount={visibleCount}
              totalCount={filteredUsers.length}
              onLoadMore={handleLoadMore}
              itemName="Users"
            />
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;
