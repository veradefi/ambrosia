// Copyright 2021 Vera http://vera.financial/
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
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