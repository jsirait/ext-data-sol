import React, { useState, useEffect } from "react";
import axios from "axios";

import ProductTable from "./ProductTable";
import SearchBar from "./SearchBar";

//import { PRODUCTS } from "./products";
const PRODUCTSURL = `http://localhost:4000/productss`;

const FilterableProductTable = props => {
  const [products, setProducts] = useState([]);
  const [filterText, setFilterText] = useState(``);
  const [inStockOnly, setInStockOnly] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(PRODUCTSURL);
        const products = await res.data;
        setProducts(products);
      } catch (e) {
        setProducts([e.message]);
      }
    };
    setTimeout(() => {
      getProducts();
    }, 5000);
  }, []);

  const handleFilterTextChange = changedFilterText => {
    setFilterText(changedFilterText);
  };

  const handleInStockOnlyChange = changedInStockOnly => {
    setInStockOnly(changedInStockOnly);
  };

  let tableDisplay = [];
  if (products.length === 0) {
    tableDisplay.push(
      <h3 key="loading">Please wait whilst we load the products...</h3>
    );
  } else if (typeof products[0] !== "string") {
    tableDisplay.push(
      <ProductTable
        products={products}
        searchDetails={{ filterText, inStockOnly }}
        key="loaded"
      />
    );
  } else {
    tableDisplay.push(
      <h3 key="error">
        There was a problem loading the products: {products[0]}
      </h3>
    );
  }

  return (
    <div>
      <SearchBar
        searchDetails={{ filterText, inStockOnly }}
        handleFilterTextChange={handleFilterTextChange}
        handleInStockOnlyChange={handleInStockOnlyChange}
      />
      {/* {typeof products[0] !== "string" ? (
        <ProductTable
          products={products}
          searchDetails={{ filterText, inStockOnly }}
        />
      ) : (
        <h3>There was a problem loading the products: {products[0]}</h3>
      )} */}
      {tableDisplay}
    </div>
  );
};

export default FilterableProductTable;
