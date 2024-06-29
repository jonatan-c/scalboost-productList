"use client";
import { useProducts } from "@/context/ProductContex";
import React from "react";

const SearchForm = () => {
  const {
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
    handleSearch,
    handleReset,
  } = useProducts();

  return (
    <>
      <div className="flex flex-col lg:flex-row flex-wrap gap-6 my-20">
        <input
          type="text"
          placeholder="Buscar productos..."
          className="p-2 border border-gray-300 rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input
          type="number"
          placeholder="Precio mínimo"
          className="p-2 border border-gray-300 rounded-md"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Precio máximo"
          className="p-2 border border-gray-300 rounded-md"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Cantidad mínima"
          className="p-2 border border-gray-300 rounded-md"
          value={minQuantity}
          onChange={(e) => setMinQuantity(e.target.value)}
        />
        <input
          type="number"
          placeholder="Cantidad máxima"
          className="p-2 border border-gray-300 rounded-md"
          value={maxQuantity}
          onChange={(e) => setMaxQuantity(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="p-2 bg-blue-500 text-white border border-gray-300 rounded-md"
        >
          Buscar
        </button>
        <button
          onClick={handleReset}
          className="p-2 bg-gray-500 text-white border border-gray-300 rounded-md"
        >
          Reiniciar
        </button>
      </div>
    </>
  );
};

export default SearchForm;
