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




// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// // import api from "../app/api/apiSlice";
// import axios from "axios";


// const initialState = {
//   cartItems: [],
//   isLoading: false,
//   error: null,
//   optimisticSnapshot: null,
//   removingById: {},
//   updatingById: {},
// };

// export const fetchCart = createAsyncThunk("cart/fetchCart", async (_, thunkAPI) => {
//   try {
//     const response = await axios.get(`users/cart`);
//     return response.data.data.inCartProducts;
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error?.response?.data || { message: error.message });
//   }
// });

// export const addToCart = createAsyncThunk('cart/addToCart', async ({ productId }, thunkAPI) => {
//     try {
//       const response = await axios.post(`users/cart/${productId}`, {});
//       return response.data.data.inCartProducts;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error?.response?.data || { message: error.message }
//       );
//     }
//   }
// );

// export const removeFromCart = createAsyncThunk("cart/removeFromCart", async (productId, thunkAPI) => {
//   try {
//     const response = await axios.delete(`users/cart/${productId}`);
//     return response.data.data.inCartProducts;
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error?.response?.data || { message: error.message });
//   }
// });

// export const increaseQuantity = createAsyncThunk("cart/increaseQuantity", async (productId, thunkAPI) => {
//   try {
//     const response = await axios.patch(`users/cart/${productId}/increase`, {});
//     return response.data.data.inCartProducts;
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error?.response?.data || { message: error.message });
//   }
// });

// export const decreaseQuantity = createAsyncThunk("cart/decreaseQuantity", async (productId, thunkAPI) => {
//   try {
//     const response = await axios.patch(`users/cart/${productId}/decrease`, {});
//     return response.data.data.inCartProducts;
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error?.response?.data || { message: error.message });
//   }
// });

// const getPid = (x) => x?.product?._id || x?.product?.id;
// const snapshot = (state) => {
//   state.optimisticSnapshot = state.cartItems.map((x) => ({
//     ...x,
//     product: x.product,
//   }));
// };

// export const CartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     clearCart: (state) => {
//       state.cartItems = [];
//       state.error = null;
//       state.optimisticSnapshot = null;
//       state.removingById = {};
//       state.updatingById = {};
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCart.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchCart.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.cartItems = action.payload;
//       })
//       .addCase(fetchCart.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//       })

//       .addCase(addToCart.pending, (state, action) => {
//         state.error = null;
//         snapshot(state);

//         const { productId, product } = action.meta.arg;

//         const existing = state.cartItems.find((x) => getPid(x) === productId);

//         if (existing) {
//           existing.quantity += 1;
//         } else {
//           state.cartItems.push({
//             product: product || { _id: productId },
//             quantity: 1,
//             _optimistic: true,
//           });
//         }
//       })
//       .addCase(addToCart.fulfilled, (state, action) => {
//         state.optimisticSnapshot = null;
//         state.cartItems = action.payload;
//       })
//       .addCase(addToCart.rejected, (state, action) => {
//         if (state.optimisticSnapshot) state.cartItems = state.optimisticSnapshot;
//         state.optimisticSnapshot = null;
//         state.error = action.payload;
//       })

//       .addCase(removeFromCart.pending, (state, action) => {
//           const productId = action.meta.arg;
//           state.error = null;
//           state.removingById[productId] = true;
//       })
//       .addCase(removeFromCart.fulfilled, (state, action) => {
//         const productId = action.meta.arg;
//         delete state.removingById[productId];
//         state.cartItems = action.payload;
//       })
//       .addCase(removeFromCart.rejected, (state, action) => {
//         const productId = action.meta.arg;
//         delete state.removingById[productId];
//         state.error = action.payload;
//       })

//       .addCase(increaseQuantity.pending, (state, action) => {
//         const productId = action.meta.arg;
//         state.error = null;
//         state.updatingById[productId] = true;
//       })
//       .addCase(increaseQuantity.fulfilled, (state, action) => {
//         const productId = action.meta.arg;
//         delete state.updatingById[productId];
//         state.cartItems = action.payload;
//       })
//       .addCase(increaseQuantity.rejected, (state, action) => {
//         const productId = action.meta.arg;
//         delete state.updatingById[productId];
//         state.error = action.payload;
//       })

//       .addCase(decreaseQuantity.pending, (state, action) => {
//         const productId = action.meta.arg;
//         state.error = null;
//         state.updatingById[productId] = true;
//       })
//       .addCase(decreaseQuantity.fulfilled, (state, action) => {
//         const productId = action.meta.arg;
//         delete state.updatingById[productId];
//         state.cartItems = action.payload;
//       })
//       .addCase(decreaseQuantity.rejected, (state, action) => {
//         const productId = action.meta.arg;
//         delete state.updatingById[productId];
//         state.error = action.payload;
//       });
//   },
// });

// export const { clearCart } = CartSlice.actions;
// export default CartSlice.reducer;