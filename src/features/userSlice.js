import apiSlice from "../app/api/apiSlice";

export const userSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => '/users/me',
    }),
    updateMe: builder.mutation({
      query: (credentials) => ({
        url: '/users/me',
        method: 'PATCH',
        body: { ...credentials },
      })
    }),
    updatePassword: builder.mutation({
      query: (credentials) => ({
        url: '/users/me/password',
        method: 'PATCH',
        body: { ...credentials },
      })
    }),
    deleteAccount: builder.mutation({
      query: () => ({
        url: '/users/me',
        method: 'DELETE',
      })
    }),
  })
});

export const {
  useGetMeQuery,
  useUpdateMeMutation,
  useUpdatePasswordMutation,
  useDeleteAccountMutation,
} = userSlice;