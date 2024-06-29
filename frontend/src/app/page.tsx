import ProductTable from "@/components/ProductTable";
import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Lista de Productos</title>
        <meta
          name="description"
          content="Listado de productos con filtros avanzados"
        />
      </Head>
      <main className="container mx-auto p-4">
        <h1 className="text-2xl mb-4 text-center">Lista de Productos</h1>
        <ProductTable />
      </main>
    </div>
  );
}
