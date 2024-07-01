import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Filter from "../components/Filter";

describe("Filter component", () => {
  it('onFilterChange with All as argument', () => {
    const mockOnFilterChange = jest.fn();
    const { getByText } = render(
      <Filter
        onFilterChange={mockOnFilterChange}
        onAll={false}
        onOpen={true}
        onClosed={true}
      />
    );
    fireEvent.click(getByText("All"));
    expect(mockOnFilterChange).toHaveBeenCalledWith(null);
  });
  it('onFilterChange with Open as argument', () => {
    const mockOnFilterChange = jest.fn();
    const { getByText } = render(
      <Filter
        onFilterChange={mockOnFilterChange}
        onAll={true}
        onOpen={false}
        onClosed={true}
      />
    );
    fireEvent.click(getByText("Open"));
    expect(mockOnFilterChange).toHaveBeenCalledWith("OPEN");
  });

  it('onFilterChange with Closed as argument', () => {
    const mockOnFilterChange = jest.fn();
    const { getByText } = render(
      <Filter
        onFilterChange={mockOnFilterChange}
        onAll={true}
        onOpen={true}
        onClosed={false}
      />
    );
    fireEvent.click(getByText("Closed"));
    expect(mockOnFilterChange).toHaveBeenCalledWith("CLOSED");
  });
});
