import { memo, useCallback } from 'react';
import { Calendar, Edit, Trash2 } from 'lucide-react';

const PostCard = memo(({ post, onEdit, onDelete }) => {
  const formatDate = useCallback((dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }, []);

  const handleEdit = useCallback(() => {
    onEdit(post);
  }, [onEdit, post]);

  const handleDelete = useCallback(() => {
    onDelete(post);
  }, [onDelete, post]);

  return (
    <div className="bg-white group dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className="font-bold text-lg text-gray-900 dark:text-white flex-1">
          {post.title}
        </h3>

        <div className="flex items-center gap-2 opacity-0 transform translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          <button
            onClick={handleEdit}
            className="p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400 transition-colors"
            aria-label="Edit post"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors"
            aria-label="Delete post"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
        {post.description}
      </p>

      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
        <Calendar className="w-4 h-4" />
        <span>{formatDate(post.date)}</span>
      </div>
    </div>

  );
});

PostCard.displayName = 'PostCard';

export default PostCard;
