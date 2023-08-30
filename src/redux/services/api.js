import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const BASE_URL = process.env.REACT_APP_URL_API;
console.log('UUUUUUUUUU====>>>', BASE_URL)



export const apiSLice = createApi({
    reducerPath: 'apiSLice',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}`
    }),
    endpoints: (bulder) => ({
        getAllTasks: bulder.query({
            query: () => '/tasks'
        }),
        getSingleTask: bulder.query({
            query: (id)=> `/tasks/${id}`,
            providesTags: ['SingleTask'],

        }),
        searchTask:bulder.query({
            query:(params)=>`/tasks/search?q=${params}`
        }),
        removeSingleTask: bulder.mutation({
            query: (taskId) => ({
                url: `/tasks/${taskId}`,
                method: 'DELETE'
            })
        }),
        addNewTask: bulder.mutation({
            query: (payload) => ({
                url: '/tasks',
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
        }),
        editSelectedTask: bulder.mutation({
            query: (payload) => ({
                url: `/tasks/${payload.id}`,
                method: 'PUT',
                body: JSON.stringify(payload),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }),
            invalidatesTags: ['SingleTask'],

        }),

        removeCheckedTasks: bulder.mutation({
            query: (payload)=>({
                url: '/tasks',
                method: 'DELETE',
                body:JSON.stringify({ids:payload}),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
        })

    })
})


export const {
    useGetAllTasksQuery,
    useRemoveSingleTaskMutation,
    useAddNewTaskMutation,
    useSearchTaskQuery,
    useEditSelectedTaskMutation,
    useRemoveCheckedTasksMutation,
    useGetSingleTaskQuery,
} = apiSLice;