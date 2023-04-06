import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'



const usersApi = createApi({
    reducerPath: 'users',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000',
    })


})