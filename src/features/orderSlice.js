import apiSlice from "../app/api/apiSlice";

export const orderSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      getOrders: builder.query({
        query: () => '/orders',
        providesTags: ['Orders']
      }),
      getOrderById: builder.query({
        query: (orderId) => `/orders/${orderId}`,
        providesTags: ['Orders']
      }),
      createOrder: builder.mutation({
        query: (credentials) => ({
            url: '/orders/create',
            method: 'POST',
            body: { ...credentials },
        }),
        invalidatesTags: ['Orders']
      }),
    })
});

export const { 
  useGetOrdersQuery,
  useCreateOrderMutation,
} = orderSlice;
