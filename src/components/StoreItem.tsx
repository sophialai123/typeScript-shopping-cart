import { Card, Button } from "react-bootstrap"
import { UserShoppingCart, } from "../context/UserShoppingCart"


type StoreItemProps = {
  id: number,
  name: string,
  price: number,
  image: string,
  category: string
}


export default function StoreItem({ id, name, price, image, category }: StoreItemProps) {

  const { getItemQty, increaseItemQty, decreaseItemQty, removeItemQty, cartItems, cartQuantity } = UserShoppingCart();
  const quantity = getItemQty(id)
  return (
    <>
      <Card className="h-100 justify-content-space-between" >
        {/* style={{ objectFit: "cover" }} */}
        <Card.Img variant="top" src={image}
          height="300px"
        />

        <Card.Body className="d-flex flex-column mt-3">
          <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
            <span className="fs-3">{name}</span>
            <span className="ms-2 text-muted">${price.toFixed(2)}</span>
          </Card.Title>
          <div className="mt-auto">
            {quantity === 0 ? (
              <Button className="w-100 mb-4" onClick={() => increaseItemQty(id)}>+ Add To Cart</Button>
            )
              :
              <div className="d-flex flex-column mb-4 justify-content-center align-items-center" style={{ gap: "0.5rem" }}>
                <div className="d-flex  align-items-center justify-content-center" style={{ gap: "0.8rem" }}>
                  <Button onClick={() => decreaseItemQty(id)}>-</Button>
                  <div>
                    <span className="fs-3">{quantity} in Cart</span>
                  </div>
                  <Button onClick={() => increaseItemQty(id)}>+</Button>
                </div>
                <Button onClick={() => removeItemQty(id)} variant="danger" className="my-2">Remove</Button>
              </div>
            }
          </div>

        </Card.Body>
      </Card>
    </>

  )
}
