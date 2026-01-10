import PageTransition from "../../components/pageTransition";
import TopSlide from "../../components/topSlide";
import Product from "../../components/slideProducts/product";
import { useSelector } from "react-redux";

import './favoritesPage.css';

const FavoritesPage = () => {

  const favItems = useSelector((state) => state.favorites.FavoritesItems);

  return (
    <PageTransition>
      <div className='favorites-products'>
        <div className="container">
          <TopSlide categoryName='Your Favorites' />
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
