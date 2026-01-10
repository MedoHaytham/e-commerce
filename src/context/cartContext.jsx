// import React, { createContext, useEffect, useState } from 'react';

// export const CartContext = createContext();

// const CartProvider = ({children}) => {

//   const [cartItems, setCartItems] = useState(() => {
//     const savedCart = localStorage.getItem('cartItems');
//     return savedCart ?  JSON.parse(savedCart) : [];
//   });

//   function addToCart(item) {
//     setCartItems((prev) => {
//       const exists = prev.find((cartItem) => cartItem.id === item.id);
//       if(exists) return prev;
//       return [...prev, {...item, quantity: 1}];
//     });
//   }

//   function removeFromCartHandler(item) {
//     setCartItems((prev) =>  
//       prev.filter((cartItem)=> cartItem.id !== item.id)
//     );
//   }

//   function increaseQuantity(item) {
//     setCartItems((prev) => 
//       prev.map((cartItem) => cartItem.id === item.id ? {...cartItem,  quantity: cartItem.quantity + 1 } : cartItem)
//     )
//   }

//   function decreaseQuantity(item) {
//     setCartItems((prev) => 
//       prev.map((cartItem) => cartItem.id === item.id ? {...cartItem,  quantity: cartItem.quantity - 1 } : cartItem)
//     )
//   }
  
//   useEffect(() => {
//     localStorage.setItem('cartItems', JSON.stringify(cartItems));
//   },[cartItems]);

//   return ( 
//     <CartContext.Provider value={{
//       cartItems,
//       addToCart,
//       removeFromCartHandler,
//       increaseQuantity,
//       decreaseQuantity,
//     }}>
//       {children}
//     </CartContext.Provider>
//   );
// }

// export default CartProvider;