// Copyright 2021 Vera http://vera.financial/
import { ContractPromise } from "@polkadot/api-contract";
import { web3FromAddress } from "@polkadot/extension-dapp";
import { bnToBn } from "@polkadot/util";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import erc721Abi from '../../erc721/metadata.json';
import { erc721Address } from '../../addresses.json';

const fromUnit = (val) => {
    return bnToBn(Number(val) * 1000000000000);
}

const toUnit = (val) => {
    return Number(val) / 1000000000000;
}

export const initErc721Contract = createAsyncThunk(
    'InitErc721Contract',
    async (action, thunkAPI) => {
        try {
            const contract = new ContractPromise(action, erc721Abi, erc721Address);
            console.log("ERC721 Contract: ", contract);
            return {
                contract
            }
        } catch (error) {
            console.log(error);
            throw error;
        }

    }
)

export const updateMyNfts = createAsyncThunk(
    'UpdateMyNfts',
    async (action, thunkAPI) => {
        function pushToLeases(array, val) {
            array.push({
                'id': String(val.id),
                'token_id': String(val.token_id),
                'duration': String(val.lease_duration),
                'amount': String(val.daily_rent),
                'nft_address': String(val.nft_address),
                'beneficiary_address': String(val.beneficiary_address),
            });
        }
        function pushToLoans(array, val) {
            array.push({
                'id': String(val.id),
                'token_id': String(val.token_id),
                'duration': String(val.duration),
                'amount': String(val.amount),
                'nft_address': String(val.nft_address),
                'beneficiary_address': String(val.beneficiary_address),
            });
        }
        try {
            const leasingContract = thunkAPI.getState().leasing.contract;
            const lendingContract = thunkAPI.getState().lending.contract;
            const { account, connected } = thunkAPI.getState().polka;
            if (connected && account) {
                const allLeases = (await leasingContract.query.listLeases(account.address, { value: 0 })).output;
                const allLoans = (await lendingContract.query.listLoans(account.address, { value: 0 })).output;
                const activeLoans = [];
                const activeLends = [];
                const activeLeases = [];
                const activeRents = [];
                for (let i = 0; i < allLeases.length; ++i) {
                    if (String(allLeases[i].beneficiary_address) === account.address) {
                        pushToLeases(activeLeases, allLeases[i]);
                    }
                    if (String(allLeases[i].renter_address) === account.address) {
                        pushToLeases(activeRents, allLeases[i]);
                    }
                }
                for (let i = 0; i < allLoans.length; ++i) {
                    if (String(allLoans[i].beneficiary_address) === account.address) {
                        pushToLoans(activeLoans, allLoans[i]);
                    }
                    if (String(allLoans[i].borrower_address) === account.address) {
                        pushToLoans(activeLends, allLoans[i]);
                    }
                }
                thunkAPI.dispatch(updateErc721({
                    activeLoans,
                    activeLends,
                    activeLeases,
                    activeRents,
                }));
            }
        } catch (error) {
            console.log(String(error));
            throw error;
        }
    }
)

export const mintNft = createAsyncThunk(
    'MintNFT',
    async (action, thunkAPI) => {
        try {
            const { contract } = thunkAPI.getState().erc721;
            const { account } = thunkAPI.getState().polka;
            const injector = await web3FromAddress(account.address);
            const { gasConsumed } = await contract.query.mint(account.address, { value: 0, gasLimit: -1 }, action.token_id);
            const hash = await contract.tx
                .mint({ value: 0, gasLimit: Number(gasConsumed) }, action.token_id)
                .signAndSend(account.address, { signer: injector.signer });
            console.log(hash);
            return true;
        } catch (error) {
            console.log(String(error));
            throw error;
        }
    }
)

const erc721Slice = createSlice({
    name: "Erc721Reducer",
    initialState: {
        contract: null,
        output: null,
        activeLoans: [],
        activeLends: [],
        activeLeases: [],
        activeRents: [],
    },
    reducers: {
        updateErc721: (state, action) => {
            state.activeLoans = action.payload.activeLoans;
            state.activeLends = action.payload.activeLends;
            state.activeLeases = action.payload.activeLeases;
            state.activeRents = action.payload.activeRents;
        }
    },
    extraReducers: {
        [initErc721Contract.fulfilled]: (state, action) => {
            state.contract = action.payload.contract;
        },
    }
})

export const erc721Reducer = erc721Slice.reducer;
export const { updateErc721 } = erc721Slice.actions;
