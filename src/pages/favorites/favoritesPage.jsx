import React, { useContext } from "react";
import PageTransition from "../../components/pageTransition";
import { FavoritesContext } from "../../context/favoritesContext";

import './favoritesPage.css';
import TopSlide from "../../components/topSlide";
import Product from "../../components/slideProducts/product";

const FavoritesPage = () => {

  const {favItems} = useContext(FavoritesContext);

  return (
    <PageTransition>
      <div className='favorites-products'>
        <div className="container">
          <TopSlide categoryName='Your Favorites' inFavorites={true}/>
          <div className="products">
            {
              favItems.length === 0 
              ? <p>No Favorites Products yet.</p>
              : favItems.map((p) => (<Product key={p.id} item={p}/>))
            }
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default FavoritesPage;
