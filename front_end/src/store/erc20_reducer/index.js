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
import { ContractPromise } from "@polkadot/api-contract";
import { bnToBn } from "@polkadot/util";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import erc20Abi from '../../erc20/metadata.json';
import { erc20Address } from '../../addresses.json';

const fromUnit = (val) => {
    return bnToBn(Number(val) * 1000000000000);
}

const toUnit = (val) => {
    return String(Number(val) / 1000000000000);
}

export const initErc20Contract = createAsyncThunk(
    'InitErc20Contract',
    async (action, thunkAPI) => {
        try {
            const contract = new ContractPromise(action, erc20Abi, erc20Address);
            console.log("ERC20 Contract: ", contract);
            return {
                contract
            }
        } catch (error) {
            console.log(error);
            throw error;
        }

    }
)

export const updateErc20Balance = createAsyncThunk(
    'UpdateErc20Balance',
    async (action, thunkAPI) => {
        try {
            const { contract } = thunkAPI.getState().erc20;
            const { account, connected } = thunkAPI.getState().polka;
            if (connected && account) {
                const { output } = await contract.query.balanceOf(account.address, { value: 0 }, account.address);
                thunkAPI.dispatch(updateErc20(toUnit(output)));
            }
        } catch (error) {
            console.log(String(error));
            throw error;
        }
    }
)

const erc20Slice = createSlice({
    name: "Erc20Reducer",
    initialState: {
        contract: null,
        balance: 0,
        output: null,
    },
    reducers: {
        updateErc20: (state, action) => {
            state.balance = action.payload;
        }
    },
    extraReducers: {
        [initErc20Contract.fulfilled]: (state, action) => {
            state.contract = action.payload.contract;
        },
    }
})

export const erc20Reducer = erc20Slice.reducer;
export const { updateErc20 } = erc20Slice.actions;