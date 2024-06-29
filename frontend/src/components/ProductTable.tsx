"use client";
import { useProducts } from "@/context/ProductContex";
import { IProduct } from "@/interfaces";

const ProductTable = () => {
  const { products, handleSort } = useProducts();

  return (
    <div>
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
          {products.map((product: IProduct) => (
            <tr key={product.id}>
              <td className="border px-4 py-2">{product.name}</td>
              <td className="border px-4 py-2">{product.price}</td>
              <td className="border px-4 py-2">{product.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
