"use client";
import { IProduct } from "@/interfaces";
import { fetchProducts } from "@/services/product.service";
import React, { createContext, useContext, useState, useEffect } from "react";

interface ProductListContextProps {
  products: IProduct[];
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  minPrice: string;
  setMinPrice: (value: string) => void;
  maxPrice: string;
  setMaxPrice: (value: string) => void;
  minQuantity: string;
  setMinQuantity: (value: string) => void;
  maxQuantity: string;
  setMaxQuantity: (value: string) => void;
  page: number;
  setPage: (value: number) => void;
  total: number;
  limit: number;
  setLimit: (value: number) => void;
  query: string;
  handleSearch: () => void;
  handleReset: () => void;
  handleSort: (field: string) => void;
  sortField: string;
  sortOrder: string;
  totalPages: number;
}

const ProductContext = createContext<ProductListContextProps>({
  products: [],
  searchTerm: "",
  setSearchTerm: () => {},
  minPrice: "",
  setMinPrice: () => {},
  maxPrice: "",
  setMaxPrice: () => {},
  minQuantity: "",
  setMinQuantity: () => {},
  maxQuantity: "",
  setMaxQuantity: () => {},
  page: 1,
  setPage: () => {},
  total: 0,
  limit: 10,
  setLimit: () => {},
  query: "",
  handleSearch: () => {},
  handleReset: () => {},
  handleSort: () => {},
  sortField: "",
  sortOrder: "asc",
  totalPages: 0,
});

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }: any) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minQuantity, setMinQuantity] = useState("");
  const [maxQuantity, setMaxQuantity] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(10);
  const [query, setQuery] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSearch = async () => {
    const newQuery = new URLSearchParams({
      name: searchTerm,
      minPrice,
      maxPrice,
      minQuantity,
      maxQuantity,
    }).toString();
    setQuery(newQuery);
    setPage(1);
    const result = await fetchProducts(newQuery, 1, limit);
    setProducts(result.data);
    setTotal(result.total);
  };

  const handleReset = async () => {
    setSearchTerm("");
    setMinPrice("");
    setMaxPrice("");
    setMinQuantity("");
    setMaxQuantity("");
    setQuery("");
    setPage(1);
    const result = await fetchProducts("", 1, limit);
    setProducts(result.data);
    setTotal(result.total);
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchProducts(query, page, limit);
      setProducts(result.data);
      setTotal(result.total);
    };
    fetchData();
  }, [query, page, limit]);

  const handleSort = (field: string) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
    sortProducts(field, order);
  };

  const sortProducts = (field: string, order: string) => {
    const sortedProducts = [...products].sort((a, b) => {
      if (a[field] < b[field]) return order === "asc" ? -1 : 1;
      if (a[field] > b[field]) return order === "asc" ? 1 : -1;
      return 0;
    });
    setProducts(sortedProducts);
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <ProductContext.Provider
      value={{
        products,
        searchTerm,
        setSearchTerm,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        minQuantity,
        setMinQuantity,
        maxQuantity,
        setMaxQuantity,
        page,
        setPage,
        total,
        limit,
        setLimit,
        query,
        handleSearch,
        handleReset,
        handleSort,
        sortField,
        sortOrder,
        totalPages,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
