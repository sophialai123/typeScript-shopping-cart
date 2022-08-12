import { useContext, ReactNode, createContext, useState } from "react";
import { ShoppingCart } from "../components/ShoppingCart";
import useLocalStorage from '../localStorage/useLocalStorage';

//ReactNode is the type give to children props in react
type ShoppingCartProviderProps = {
  children: ReactNode

}

//function types
type ShoppingCartContextType = {
  getItemQty: (id: number) => number //return number
  increaseItemQty: (id: number) => void //return nothing
  decreaseItemQty: (id: number) => void
  removeItemQty: (id: number) => void
  openCart: () => void
  closeCart: () => void
  cartQuantity: number
  cartItems: CartItem[]

}


//type for cart items(useState array type)
type CartItem = {
  id: number,
  quantity: number
}


//createContext type is ShoppingCartContextType
const ShoppingCartContext = createContext({} as ShoppingCartContextType)

export function UserShoppingCart() {
  return (
    useContext(ShoppingCartContext)
  )
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping-cart", []);
  const [isOpen, setIsOpen] = useState(false);

  const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0)

  function openCart() {
    setIsOpen(true)
  }

  function closeCart() {
    setIsOpen(false)
  }


  function getItemQty(id: number) {
    //if find item return quantity otherwise return 0
    return cartItems.find(item => item.id === id)?.quantity || 0
  }

  function increaseItemQty(id: number) {
    setCartItems(currItems => {
      //if the item does not exsit, then add quantity to 1
      if (currItems.find(item => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }]
      }
      //add new items
      else {
        return currItems.map(item => {
          //if find the item, then add more quantity on top of it,
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 }
          } else {
            return item // otherwise just return exsiting item
          }
        })
      }
    })
  }

  function decreaseItemQty(id: number) {
    setCartItems(currentItems => {
      //if the item quantity is 1, then remove it 
      if (currentItems.find(item => item.id === id)?.quantity === 1) {
        return currentItems.filter(item => item.id !== id)
      }
      //otherwise current iteam quantity -1
      else {
        return currentItems.map(item => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 }
          } else {
            return item
          }
        })
      }
    })
  }

  function removeItemQty(id: number) {
    setCartItems(currentItems => {
      return currentItems.filter(item => item.id !== id)
    })
  }

  return (
    <ShoppingCartContext.Provider value={{ getItemQty, increaseItemQty, decreaseItemQty, removeItemQty, openCart, closeCart, cartQuantity, cartItems }}>
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  )
}