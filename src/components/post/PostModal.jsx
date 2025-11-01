import Modal from '../common/Modal';
import PostForm from './PostForm';

const PostModal = ({ isOpen, onClose, post, onSubmit }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={post ? 'Edit Post' : 'Create New Post'}
      size="lg"
    >
      <PostForm
        post={post}
        onSubmit={onSubmit}
        onCancel={onClose}
      />
    </Modal>
  );
};

export default PostModal;
