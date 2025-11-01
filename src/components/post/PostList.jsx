import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import PostCard from './PostCard';
import PostModal from './PostModal';
import ConfirmDialog from '../common/ConfirmDialog';
import Button from '../common/Button';
import SearchBar from '../common/SearchBar';
import EmptyState from '../common/EmptyState';
import NumberedPagination from '../common/NumberedPagination';
import { useData } from '../../context/DataContext';

const PostList = ({ userId }) => {
  const { getPostsByUserId, searchPosts, addPost, updatePost, deletePost } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [deletingPost, setDeletingPost] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const allUserPosts = getPostsByUserId(userId);
  const filteredPosts = searchQuery
    ? searchPosts(searchQuery, userId)
    : allUserPosts;

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const handleAdd = () => {
    setEditingPost(null);
    setIsModalOpen(true);
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setIsModalOpen(true);
  };

  const handleSubmit = (data) => {
    if (editingPost) {
      updatePost(editingPost.id, data);
    } else {
      addPost(parseInt(userId), data);
    }
    setIsModalOpen(false);
    setEditingPost(null);
  };

  const handleDelete = () => {
    if (deletingPost) {
      deletePost(deletingPost.id);
      setDeletingPost(null);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Posts ({filteredPosts.length})
        </h2>
        <Button variant="primary" icon={Plus} onClick={handleAdd}>
          New Post
        </Button>
      </div>

      <div className="mb-6">
        <SearchBar
          onSearch={setSearchQuery}
          placeholder="Search posts by title..."
        />
      </div>

      {filteredPosts.length === 0 ? (
        <EmptyState
          title={searchQuery ? "No posts found" : "No posts yet"}
          description={
            searchQuery
              ? "Try adjusting your search query"
              : "Create your first post to get started"
          }
        />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onEdit={handleEdit}
                onDelete={(post) => setDeletingPost(post)}
              />
            ))}
          </div>

          <NumberedPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            startIndex={startIndex}
            endIndex={endIndex}
            totalItems={filteredPosts.length}
            itemName="posts"
          />
        </>
      )}

      <PostModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingPost(null);
        }}
        post={editingPost}
        onSubmit={handleSubmit}
      />

      <ConfirmDialog
        isOpen={!!deletingPost}
        onClose={() => setDeletingPost(null)}
        onConfirm={handleDelete}
        title="Delete Post"
        message="Are you sure you want to delete this post? This action cannot be undone."
      />
    </div>
  );
};

export default PostList;
