import apiSlice from "../app/api/apiSlice";

const getPid = (x) => x?._id || x?.id || x?.product?._id || x?.product?.id;

export const favoritesSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchFavorites: builder.query({
      query: () => 'users/favorites',
    }),
    toggleFavorites: builder.mutation({
      query: ({productId}) => ({
        url: `users/favorites/${productId}`,
        method: 'POST'
      }),
      async onQueryStarted({productId, product}, {dispatch, queryFulfilled}) {
        const patchResult = dispatch(
          favoritesSlice.util.updateQueryData('fetchFavorites', undefined, (draft) => {
            if (!draft?.data?.favoriteProducts) return

            const existing = draft.data.favoriteProducts.find(
              (x) => getPid(x) === productId
            );

            if (existing) {
              draft.data.favoriteProducts = draft.data.favoriteProducts.filter(
                (x) => getPid(x) !== productId 
              )
            } else {
              draft.data.favoriteProducts.push({
                ...product,
                _optimistic: true
              })
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    })
  })
});

export const {
  useFetchFavoritesQuery,
  useToggleFavoritesMutation,
} = favoritesSlice;