"use client";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  brand: string;
  description: string;
  photo: string;
  price: string;
  createdAt: string;
  updatedAt: string;
  quantity?: number;
}

const URL_API =
  "https://mks-frontend-challenge-04811e8151e6.herokuapp.com/api/v1/products?page=1&rows=8&sortBy=id&orderBy=ASC";

export default function useProducts() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<Error | null>(null);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const response = await fetch(URL_API);
      const data = await response.json();
      setProducts(data.products);
      console.log(data.products);
    } catch (error) {
      setError(error as Error);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  return { loading, products, error };
}
