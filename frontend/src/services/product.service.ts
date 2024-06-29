
export const fetchProducts = async (query = '', page = 1, limit = 10) => {
    const response = await fetch(`http://localhost:4000/products?page=${page}&limit=${limit}&${query}`);
    const data = await response.json();
    return data;
  };
  