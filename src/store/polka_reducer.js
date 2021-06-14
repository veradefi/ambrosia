import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { ApiPromise,WsProvider } from '@polkadot/api';
import { web3Accounts,web3Enable } from '@polkadot/extension-dapp';
import { initErc20Contract } from "./erc20_reducer";
import { initLendingContract } from "./lending_reducer";
import { initErc721Contract,updateMyNfts } from "./erc721_reducer";
import { initleasingContract } from "./leasing_reducer";

// const NODE_URL = "ws://127.0.0.1:9944";
const NODE_URL = "ws://18.219.122.155:9944";
const types = { "Balance": "u128","Address": "AccountId","LookupSource": "AccountId","AccountInfo": 'AccountInfoWithRefCount' };

export const initPolkaDot = createAsyncThunk(
    "InitPolkaDot",
    async (action,thunkAPI) => {
        try {
            console.log("Initializing...");
            if (thunkAPI.getState().polka.connected) return;
            const wsProvider = new WsProvider(NODE_URL);
            const api = await ApiPromise.create({ provider: wsProvider,types: types });
            console.log('API Initiated: ',api);
            thunkAPI.dispatch(initAccounts(api));
            thunkAPI.dispatch(initErc20Contract(api));
            thunkAPI.dispatch(initErc721Contract(api));
            thunkAPI.dispatch(initLendingContract(api));
            thunkAPI.dispatch(initleasingContract(api));
            api.query.timestamp.now(() => {
                const erc721Contract = thunkAPI.getState().erc721.contract;
                if (erc721Contract) {
                    thunkAPI.dispatch(updateMyNfts());
                }
            });
            return {
                api,
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
)

export const initAccounts = createAsyncThunk(
    "InitAccounts",
    async (action,thunkAPI) => {
        try {
            let { account } = thunkAPI.getState().polka;

            const allInjected = await web3Enable('Defi');
            if (allInjected.length !== 0) {
                const injectedAccounts = await web3Accounts();
                if (injectedAccounts.length !== 0) {
                    let accountExists = false;
                    for (let i = 0; i < injectedAccounts.length; ++i) {
                        if (injectedAccounts[i] === account) {
                            accountExists = true;
                            break;
                        }
                    }
                    if (!accountExists)
                        account = injectedAccounts[0]
                    return {
                        accounts: injectedAccounts,
                        account,
                    }
                }
            }
            throw new Error('Unable to fetch accounts from polkadot extension');
        } catch (error) {
            console.log(String(error));
            throw error;
        }
    }
)

export const updateBalances = createAsyncThunk(
    "UpdateBalances",
    async (action,thunkAPI) => {
        try {
            const { api,connected,accounts } = thunkAPI.getState().polka;
            if (connected && accounts) {
                const addresses = accounts.map(account => account.address);

                const balances = await api.query.system.account
                    .multi(addresses);
                const balancesMap = addresses.reduce((acc,address,index) => ({
                    ...acc,[address]: balances[index].data.free.toHuman()
                }),{});
                thunkAPI.dispatch(updateBalance(balancesMap));
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
)

const polkaDotSlice = createSlice({
    name: "PolkaDotReducer",
    initialState: {
        api: null,
        connected: false,
        account: null,
        accounts: null,
        balances: {},
        timestamp: 0,
    },
    reducers: {
        disconnectWallet: (state) => {
            state.connected = false;
        },
        updateBalance: (state,action) => {
            state.balances = action.payload.addresses.reduce((acc,address,index) => ({
                ...acc,[address]: action.payload.balances[index].data.free.toHuman()
            }),{});
        },
        updateTimestamp: (state,action) => {
            state.timestamp = action.payload;
        },
        switchAccount: (state,action) => {
            for (let i = 0; i < state.accounts.length; ++i) {
                if (state.accounts[i].address === action.payload) {
                    state.account = state.accounts[i];
                    break;
                }
            }
        }
    },
    extraReducers: {
        [initPolkaDot.fulfilled]: (state,action) => {
            state.api = action.payload.api;
        },
        [initAccounts.fulfilled]: (state,action) => {
            state.accounts = action.payload.accounts;
            state.account = action.payload.account;
            state.connected = true;
        },
        [initAccounts.rejected]: (state) => {
            state.accounts = null;
            state.account = null;
            state.connected = false;
        },
    }
})

export const polkaDotReducer = polkaDotSlice.reducer;
export const { disconnectWallet,updateBalance,updateTimestamp,switchAccount } = polkaDotSlice.actions;
