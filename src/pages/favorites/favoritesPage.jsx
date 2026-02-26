import PageTransition from "../../components/pageTransition";
import TopSlide from "../../components/topSlide";
import Product from "../../components/slideProducts/product";
import { useSelector } from "react-redux";
import FavPageLoading from "./favPageLoading";

import './favoritesPage.css';

const FavoritesPage = () => {

  const { favoritesItems, isLoading } = useSelector((state) => state.favorites);

  const favorites = (favoritesItems || []).map((p) => ({ ...p, id: p._id }));

  return (
    <PageTransition>
      {
        isLoading 
        ? <FavPageLoading count={3}/> 
        : <div className='favorites-products'>
            <div className="container">
              <TopSlide categoryName='Your Favorites' />
              <div className="products">
                {
                  favorites.length === 0 
                  ? <p>No Favorites Products yet.</p>
                  : favorites.map((p) => (<Product key={p.id} item={p}/>))
                }
              </div>
            </div>
          </div>
      }

    </PageTransition>
  );
};

export default FavoritesPage;
