"use client";
import { useProducts } from "@/context/ProductContex";
import React from "react";

const Pagination = () => {
  const { page, setPage, totalPages } = useProducts();

  return (
    <>
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className={`p-2 bg-gray-300 text-gray-700 border border-gray-300 rounded-md ${
            page === 1 ? "cursor-not-allowed" : ""
          }`}
        >
          Anterior
        </button>
        <span>
          Página {page} de {totalPages}
        </span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className={`p-2 bg-gray-300 text-gray-700 border border-gray-300 rounded-md ${
            page === totalPages ? "cursor-not-allowed" : ""
          }`}
        >
          Siguiente
        </button>
      </div>
    </>
  );
};

export default Pagination;
