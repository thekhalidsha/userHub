import Button from './Button';

const LoadMorePagination = ({ 
  currentCount, 
  totalCount, 
  onLoadMore, 
  increment = 4,
  itemName = 'items'
}) => {
  const hasMore = currentCount < totalCount;

  if (!hasMore) return null;

  return (
    <div className="mt-8 text-center">
      <Button variant="secondary" onClick={onLoadMore}>
        Load More {itemName}
      </Button>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
        Showing {currentCount} of {totalCount} {itemName.toLowerCase()}
      </p>
    </div>
  );
};

export default LoadMorePagination;
