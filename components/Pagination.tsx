import React from "react";

interface PaginationProps {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  onNextPage: () => void;
  onPreviousPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  hasNextPage,
  hasPreviousPage,
  onNextPage,
  onPreviousPage,
}) => {
  return (
    <div>
      <button disabled={!hasPreviousPage} onClick={onPreviousPage}>
        Previous Page
      </button>
      <button disabled={!hasNextPage} onClick={onNextPage}>
        Next Page
      </button>
    </div>
  );
};
export default Pagination;