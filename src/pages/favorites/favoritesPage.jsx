import PageTransition from "../../components/pageTransition";
import TopSlide from "../../components/topSlide";
import Product from "../../components/slideProducts/product";
import FavPageLoading from "./favPageLoading";
import { useFetchFavoritesQuery } from "../../features/favoritesSlice";

import './favoritesPage.css';

const FavoritesPage = () => {

  const { data: favoritesData, isLoading } = useFetchFavoritesQuery();
  const favoritesItems = favoritesData?.data?.favoriteProducts || [];

  const getPid = (x) => x?._id || x?.id || x?.product?._id || x?.product?.id

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
                  favoritesItems.length === 0 
                  ? <p>No Favorites Products yet.</p>
                  : favoritesItems.map((p) => 
                    (<Product key={getPid(p)} item={p.product || p}/>))
                }
              </div>
            </div>
          </div>
      }

    </PageTransition>
  );
};

export default FavoritesPage;
