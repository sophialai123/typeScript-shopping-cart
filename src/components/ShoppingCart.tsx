import { Offcanvas, Stack } from "react-bootstrap";
import { UserShoppingCart } from "../context/UserShoppingCart";
import CartItem from '../components/CartItem';
import storeItems from "../data/items.json";

type ShoppingCartType = {
  isOpen: boolean
}
export function ShoppingCart({ isOpen }: ShoppingCartType) {
  const { closeCart, cartItems } = UserShoppingCart()
  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          Cart
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={4}>
          {cartItems.map(item =>
            <CartItem key={item.id}
              {...item}
            />
          )}
          <div className="ms-auto fw-fold fs-3">
            Total: ${" "}
            {cartItems.reduce((total, cartItem) => {
              const item = storeItems.find(item => item.id === cartItem.id)
              return total + (item?.price || 0) * cartItem.quantity;
            }, 0).toFixed(2)}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  )
}
