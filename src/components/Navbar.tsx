import { Container, Nav, Navbar as NavbarBs, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import { UserShoppingCart } from "../context/UserShoppingCart";

export default function Navbar() {
  const { openCart, cartQuantity } = UserShoppingCart()
  return (
    <NavbarBs sticky="top" className='bg-white mb-3 shadow-sm'>
      <Container>
        <Nav>
          {/* use Nav.Link from boostrap, as Link is from the react-router-dom */}
          <Nav.Link to='/' as={Link}>
            Home
          </Nav.Link >
          <Nav.Link to='/store' as={Link}>
            Store
          </Nav.Link >
        </Nav>
        <Button
          onClick={openCart}
          className='rounded-circle'
          variant='outline-primary'
          style={{ position: "relative" }}>
          <HiOutlineShoppingCart style={{ width: "3rem", height: "3rem" }} />
          <div className='rounded-circle bg-danger d-flex justify-content-center align-items-center'
            style={{
              color: "white",
              width: "1.5rem",
              height: "1.5rem",
              position: 'absolute',
              top: 0,
              right: "8%"
            }}>{cartQuantity}</div>
        </Button>
      </Container>
    </NavbarBs>
  )
}

