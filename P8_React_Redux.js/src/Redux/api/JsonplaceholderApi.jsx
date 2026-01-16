import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";





export const jsonAPI = createApi({
    reducerPath : "JSONAPI",
    baseQuery : fetchBaseQuery({baseUrl : "https://jsonplaceholder.typicode.com/"}),
    endpoints : (builder) =>({
        fetchPosts : builder.query({
            query : () =>   `posts`
        }),
        fetchPostById : builder.query({
            query : (id) => `posts/${id}`
        })
    })
})






export const {useFetchPostsQuery} = jsonAPI
export const {useFetchPostByIdQuery} = jsonAPI