import React from "react";

const SearchBar = props => {
  return (
    <form>
      <input
        type="text"
        placeholder="Search..."
        value={props.searchDetails.filterText}
        onChange={event => props.handleFilterTextChange(event.target.value)}
      />
      <p>
        <input
          type="checkbox"
          checked={props.searchDetails.inStockOnly}
          onChange={event =>
            props.handleInStockOnlyChange(event.target.checked)
          }
        />
        Only show products in stock
      </p>
    </form>
  );
};

export default SearchBar;
