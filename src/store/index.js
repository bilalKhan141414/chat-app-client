import { createStore } from 'redux'
import reducer from './combine-reducer'

import { configureStore } from '@reduxjs/toolkit'
const preloadedState = {
}
const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState,
    enhancers: [],
})

export default store;