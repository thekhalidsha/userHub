import { ArrowLeft } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import UserInfo from '../components/user/UserInfo';
import PostList from '../components/post/PostList';
import Breadcrumbs from '../components/common/Breadcrumbs';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';
import { useData } from '../context/DataContext';
import UserNotFoundPage from './UserNotFoundPage';

const UserDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { users, loading } = useData();

  const user = users.find(u => u.id === parseInt(id));

  if (loading.users) {
    return <Loader fullScreen text="Loading user details..." />;
  }

  if (!user) {
    return <UserNotFoundPage />;
  }

  return (
    <div>
      <div className="flex items-center justify-between h-max mb-3">
        <Breadcrumbs items={[{ label: user.name }]} />
        <Button
          variant="ghost"
          icon={ArrowLeft}
          onClick={() => navigate('/')}
        >
          Back to Users
        </Button>
      </div>

      <div className="space-y-8">
        <UserInfo user={user} />
        <PostList userId={id} />
      </div>
    </div>
  );
};

export default UserDetailPage;
