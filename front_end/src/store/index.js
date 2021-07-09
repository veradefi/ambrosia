// Copyright 2021 Vera http://vera.financial/
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { erc20Reducer } from './erc20_reducer';
import { erc721Reducer } from './erc721_reducer';
import { leasingReducer } from './leasing_reducer';
import { lendingReducer } from './lending_reducer';
import { polkaDotReducer } from './polka_reducer';

// const store = createStore(reducer, applyMiddleware(thunk))
const store = configureStore({
    reducer: {
        polka: polkaDotReducer,
        erc20: erc20Reducer,
        lending: lendingReducer,
        leasing: leasingReducer,
        erc721: erc721Reducer,
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false,
    })
})

export default store;