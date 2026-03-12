import apiSlice from "../app/api/apiSlice";

const getPid = (x) => x?.product?._id || x?.product?.id;

export const cartSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchCart: builder.query({
      query: () => "/users/cart",
      providesTags: ["Cart"],
    }),
    addToCart: builder.mutation({
      query: ({ productId }) => ({
        url: `/users/cart/${productId}`,
        method: "POST",
      }),
      async onQueryStarted({productId, product}, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          cartSlice.util.updateQueryData('fetchCart', undefined, (draft) => {
            if(!draft?.data?.inCartProducts) return;
            
            const existing = draft.data.inCartProducts.find(
              (x) => getPid(x) === productId
            );

            if (!existing) {
              draft.data.inCartProducts.push({
                product: product || { _id: productId },
                quantity: 1,
                _optimistic: true,
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
      invalidatesTags: ["Cart"],
    }),
    removeFromCart: builder.mutation({
      query: ({ productId }) => ({
        url: `/users/cart/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
    increaseQuantity: builder.mutation({
      query: ({ productId }) => ({
        url: `/users/cart/${productId}/increase`,
        method: "PATCH",
      }),
      invalidatesTags: ["Cart"],
    }),
    decreaseQuantity: builder.mutation({
      query: ({ productId }) => ({
        url: `/users/cart/${productId}/decrease`,
        method: "PATCH",
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useFetchCartQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useIncreaseQuantityMutation,
  useDecreaseQuantityMutation,
} = cartSlice;