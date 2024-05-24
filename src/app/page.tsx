import Footer from "@/components/Footer/footer";
import Header from "@/components/Header/header";
import { CartProvider } from "@/components/context/cartContext";
import ProductsList from "@/components/prodctsList/productsList";
import { Fragment } from "react";

export default function Home() {
  return (
    <CartProvider>
      <Fragment>
        <main>
          <Header />
          <ProductsList />
        </main>
        <Footer />
      </Fragment>
    </CartProvider>
  );
}
