"use client";

import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Typography } from "@mui/material";
import Image from "next/image";
import useProducts from "../../../hooks/useProducts";
import { useCart } from "../context/cartContext";
import styles from "./productsList.module.css";

export default function ProductsList() {
  const { loading, products, error } = useProducts();
  const { addToCart } = useCart();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading products</div>;
  }

  if (!Array.isArray(products) || products.length === 0) {
    return <div>No products available</div>;
  }

  return (
    <div className={styles.containerProducts}>
      {products.map((product) => (
        <div key={product.id} className={styles.container}>
          <div className={styles.products}>
            <div className={styles.containerImage}>
              <Image
                src={product.photo}
                alt={product.name}
                className={styles.image}
                width={150}
                height={170}
                priority
              />
            </div>
            <div className={styles.containerInfos}>
              <Typography variant="h6" className={styles.nameProduct}>
                {product.name}
              </Typography>
              <div className={styles.price}>
                R${parseInt(product.price, 10).toFixed(0).toString()}
              </div>
            </div>
            <Typography variant="body2" className={styles.description}>
              {product.description}
            </Typography>
          </div>
          <button className={styles.button} onClick={() => addToCart(product)}>
            <ShoppingBasketIcon />
            COMPRAR
          </button>
        </div>
      ))}
    </div>
  );
}
