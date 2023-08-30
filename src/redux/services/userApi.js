import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const USER_URL_API = process.env.REACT_APP_URL_API_USER;

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${USER_URL_API}`
    }),
    endpoints: (bulder) => ({
        registerNewUser: bulder.mutation({
            query: ({ password }) => ({
                url: '/register',
                method: 'POST',
                body: JSON.stringify({ email: "eve.holt@reqres.in", password }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
        }),

        signIn: bulder.mutation({
            query:({password})=>({
                url: '/login',
                method: 'POST',
                body: JSON.stringify({ email: "eve.holt@reqres.in", password }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
        })


    })
})

export const { useRegisterNewUserMutation, useSignInMutation } = userApi;