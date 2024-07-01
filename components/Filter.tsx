import React from "react";

interface FilterProps {
  onFilterChange: (filter: string | null) => void;
  onAll: boolean;
  onOpen: boolean;
  onClosed: boolean;
}

const Filter: React.FC<FilterProps> = ({
  onFilterChange,
  onAll,
  onOpen,
  onClosed,
}) => {
  return (
    <div>
      <button disabled={onAll} onClick={() => onFilterChange(null)}>
        All
      </button>
      <button disabled={onOpen} onClick={() => onFilterChange("OPEN")}>
        Open
      </button>
      <button disabled={onClosed} onClick={() => onFilterChange("CLOSED")}>
        Closed
      </button>
    </div>
  );
};
export default Filter;