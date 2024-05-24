"use client";
import CloseIcon from "@mui/icons-material/Close";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import FormGroup from "@mui/material/FormGroup";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { montserrat } from "../../app/fonts";
import { useCart } from "../context/cartContext";
import styles from "./header.module.css";

export default function Header() {
  const { cart, isCartOpen, toggleCart, removeFromCart, updateCartQuantity } =
    useCart();

  const calculateTotal = () => {
    return cart
      .reduce(
        (total, item) => total + parseFloat(item.price) * item.quantity,
        0
      )
      .toFixed(2);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <FormGroup></FormGroup>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            className={styles.titleHeader}
          >
            MKS
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, fontFamily: montserrat, fontWeight: 400 }}
              fontWeight={400}
              className={styles.titleSystem}
            >
              Sistemas
            </Typography>
          </Typography>

          <div className={styles.containerButton} onClick={toggleCart}>
            <LocalGroceryStoreIcon color="action" />
            <Typography className={styles.number}>{cart.length}</Typography>
          </div>
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={isCartOpen} onClose={toggleCart}>
        <div className={styles.cart}>
          <Typography variant="h6" className={styles.title}>
            Carrinho de Compras
          </Typography>

          <div className={styles.containerItensSelect}>
            <div>
              {cart.map((item, index) => (
                <div key={index} className={styles.cartItem}>
                  <img src={item.photo} alt={item.name} />
                  <div className={styles.cartItemDetails}>
                    <Typography className={styles.cartItemName}>
                      {item.name}
                    </Typography>
                    <div className={styles.cartItemControls}>
                      <button
                        onClick={() =>
                          updateCartQuantity(item.id, item.quantity - 1)
                        }
                      >
                        -
                      </button>
                      <Typography>{item.quantity}</Typography>
                      <button
                        onClick={() =>
                          updateCartQuantity(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                    <Typography>
                      R${(parseFloat(item.price) * item.quantity).toFixed(2)}
                    </Typography>
                  </div>
                  <IconButton
                    className={styles.cartItemRemove}
                    onClick={() => removeFromCart(item.id)}
                  >
                    <CloseIcon />
                  </IconButton>
                </div>
              ))}
            </div>
            <div>
              <div className={styles.cartTotal}>
                <Typography>Total:</Typography>
                <Typography>R${calculateTotal()}</Typography>
              </div>
              <div
                className={styles.checkoutButton}
                onClick={() => alert("Finalizar compra")}
              >
                Finalizar compra
              </div>
            </div>
          </div>
        </div>
      </Drawer>
    </Box>
  );
}
