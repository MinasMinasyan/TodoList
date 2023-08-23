import { configureStore } from '@reduxjs/toolkit';
import { apiSLice } from './api';
import tasksReducer from './tasksReducer';


const store = configureStore({
    reducer: {
        [apiSLice.reducerPath]: apiSLice.reducer,
        tasksReducer: tasksReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSLice.middleware),
})

export default store