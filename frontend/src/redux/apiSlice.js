import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import hostname from '../utils/domain'

const apiSlice = createApi({
    reducerPath : 'api',
    baseQuery : fetchBaseQuery({
        baseUrl : hostname,
        prepareHeaders : (headers) => {
            const token = localStorage.getItem('token')
            headers.set('Authorization', `Bearer ${token}`)
            return headers;
        }
    }),
    tagTypes : ['Arenas'],
    endpoints : (builder) => ({
        getAllArenas : builder.query({
           query : () => ({
            url : '/explore',
            headers : {}
           }),
           providesTags : ['Arenas']
        }),
        getUserArenas : builder.query({
            query : (skipState) => `/dashboard/recent-arenas/?skip=${skipState}&limit=3`,
            providesTags : ['Arenas']
        }),
        getArena : builder.query({
            query : (id) => `/dashboard/get-arena/${id}`
        }),
        createUserArena : builder.mutation({
            query : (arenaName) => ({
                url : '/dashboard/create-arena',
                method : 'POST',
                body : arenaName
            }),
            invalidatesTags : ['Arenas']
        }),
        updateUserArena : builder.mutation({
            query : ({id,html,css,js}) => ({
                url : '/dashboard/save-files',
                method : 'POST',
                body : {id,html,css,js}
            }),
            invalidatesTags : ['Arenas']
        }),
        deleteUserArena : builder.mutation({
            query : (id) => ({
                url : '/dashboard/delete-arena',
                method : 'POST',
                body : id
            }),
            invalidatesTags : ['Arenas']
        }),
        forkArena : builder.mutation({
            query : (forkedFiles) => ({
                url : '/dashboard/save-forked-files',
                method : 'POST',
                body : forkedFiles
            }),
            invalidatesTags : ['Arenas']
        })
    })
})
  
export const {useGetAllArenasQuery,useGetUserArenasQuery,useLazyGetArenaQuery,useCreateUserArenaMutation,useUpdateUserArenaMutation,useDeleteUserArenaMutation,useForkArenaMutation} = apiSlice
export default apiSlice