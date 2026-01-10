// import React, { createContext, useEffect, useState } from 'react';

// export const FavoritesContext = createContext();

// const FavoritesProvider = ({children}) => {

//   const [favItems, setFavItems] = useState(() => {
//     const savedFav = localStorage.getItem('favItems');
//     return savedFav ? JSON.parse(savedFav) : [];
//   })

//   useEffect(()=> {
//     localStorage.setItem('favItems', JSON.stringify(favItems));
//   },[favItems]);

//   function toggleFavorites(item) {
//     setFavItems((prevs) => {
//       const exists = prevs.find((favItem) => favItem.id === item.id);
//       return exists 
//         ? prevs.filter((favItem) => favItem.id !== item.id) 
//         : [...prevs, item];
//     });
//   }

//   return ( 
//     <FavoritesContext.Provider value={{
//       favItems,
//       toggleFavorites,
//     }}>
//       {children}
//     </FavoritesContext.Provider>
//   );
// }

// export default FavoritesProvider;