"use client";
import { fetchProducts } from "@/services/product.service";
import { useState, useEffect } from "react";

const ProductTable = () => {
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

  const totalPages = Math.ceil(total / limit);

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

  return (
    <div>
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
      <table className="min-w-full mt-5 pt-5">
        <thead>
          <tr>
            <th
              className="py-2 my-6 text-white border bg-slate-400 cursor-pointer"
              onClick={() => handleSort("name")}
            >
              Nombre
            </th>
            <th
              className="py-2 my-6 text-white border bg-slate-400 cursor-pointer"
              onClick={() => handleSort("price")}
            >
              Precio
            </th>
            <th
              className="py-2 my-6 text-white border bg-slate-400 cursor-pointer"
              onClick={() => handleSort("quantity")}
            >
              Cantidad
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product: any) => (
            <tr key={product.id}>
              <td className="border px-4 py-2">{product.name}</td>
              <td className="border px-4 py-2">{product.price}</td>
              <td className="border px-4 py-2">{product.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
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
    </div>
  );
};

export default ProductTable;
