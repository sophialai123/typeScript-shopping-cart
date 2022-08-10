import { Offcanvas } from "react-bootstrap";
import { UserShoppingCart } from "../context/UserShoppingCart";

type ShoppingCartType = {
  isOpen: boolean
}
export function ShoppingCart({ isOpen }: ShoppingCartType) {
  const { closeCart } = UserShoppingCart()
  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          Cart
        </Offcanvas.Title>
      </Offcanvas.Header>
    </Offcanvas>
  )
}
