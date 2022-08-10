import { UserShoppingCart } from "../context/UserShoppingCart";
import { Button, Stack } from "react-bootstrap";
import storeItems from "../data/items.json";
import { BsTrashFill } from "react-icons/bs"

type CartItemProps = {
  id: number,
  quantity: number
}

export default function CartItem({ id, quantity }: CartItemProps) {
  const { removeItemQty } = UserShoppingCart();
  const item = storeItems.find(item => item.id === id)
  if (item == null) return null;

  return (
    <Stack
      direction="horizontal"
      gap={2}
      className="d-flex align-items-center"
    >
      <img src={item.image}
        style={{ width: "125px", height: "75px ", objectFit: "cover" }} alt={item.image} />
      <div className="me-auto">
        {item.name}{" "}
        {/* show it when quanity is greater than 1 */}
        {quantity > 1 && (
          <span className="text-muted">{quantity}x</span>
        )}
        <div className="text-muted">
          ${item.price.toFixed(2)}
        </div>
      </div>
      <div>${(item.price * quantity).toFixed(2)}</div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeItemQty(item.id)}>{<BsTrashFill />}</Button>
    </Stack>
  )
}
