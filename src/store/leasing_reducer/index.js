import { ContractPromise } from "@polkadot/api-contract";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import leasingAbi from '../../leasingmanager/metadata.json';
import { leasingAddress,erc721Address } from '../../addresses.json';
import { bnToBn } from "@polkadot/util";
import { web3FromAddress } from "@polkadot/extension-dapp";

const fromUnit = (val) => {
    return bnToBn(Number(val) * 1000000000000);
}

export const initleasingContract = createAsyncThunk(
    'InitleasingContract',
    async (action,thunkAPI) => {
        try {
            const contract = new ContractPromise(action,leasingAbi,leasingAddress);
            console.log("leasing Contract: ",contract);
            return {
                contract
            }
        } catch (error) {
            console.log(error);
            throw error;
        }

    }
)

export const getOwner = createAsyncThunk(
    "GetOwner",
    async (action,thunkAPI) => {
        try {
            const { contract } = thunkAPI.getState().leasing;
            const { account } = thunkAPI.getState().polka;
            const { output } = await contract.query.getOwner(account.address,{ value: 0 });
            console.log(output.toHuman());
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
)

export const listLeases = createAsyncThunk(
    'ListLeases',
    async (action,thunkAPI) => {
        try {
            const { contract } = thunkAPI.getState().leasing;
            const { account } = thunkAPI.getState().polka;
            if (contract == null || account == null)
                throw 'Contract and/or account not initialized';
            const output = (await contract.query.listLeases(account.address,{ value: 0 })).output;
            const allLeases = [];
            for (let i = 0; i < (output || []).length; ++i) {
                if (String(output[i].status) === '0') {
                    allLeases.push({
                        'id': String(output[i].id),
                        'token_id': String(output[i].token_id),
                        'duration': String(output[i].lease_duration),
                        'amount': String(output[i].daily_rent),
                        'nft_address': String(output[i].nft_address),
                        'beneficiary_address': String(output[i].beneficiary_address),
                    });
                }
            }
            return {
                allLeases,
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
)

export const rentLease = createAsyncThunk(
    'RentLease',
    async (action,thunkAPI) => {
        try {
            const leasingContract = thunkAPI.getState().leasing.contract;
            const { account } = thunkAPI.getState().polka;
            const erc20Contract = thunkAPI.getState().erc20.contract;
            if (leasingContract == null || account == null || erc20Contract == null)
                throw 'Contract and/or account not initialized';
            const injector = await web3FromAddress(account.address);
            const approveGasConsumed = (await erc20Contract.query.approve(account.address,{ value: 0,gasLimit: -1 },leasingAddress,fromUnit(action.amount))).gasConsumed;
            const output1 = await erc20Contract.tx
                .approve({ value: 0,gasLimit: Number(approveGasConsumed) },leasingAddress,fromUnit(action.amount))
                .signAndSend(account.address,{ signer: injector.signer });
            console.log(output1);

            const leaseGasConsumed = (await leasingContract.query.rent(account.address,{ value: 0,gasLimit: -1 },action.id)).gasConsumed;
            const output2 = await leasingContract.tx
                .rent({ value: 0,gasLimit: Number(leaseGasConsumed) },action.id)
                .signAndSend(account.address,{ signer: injector.signer });
            console.log(output2);

            return true;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
)

export const addLease = createAsyncThunk(
    'AddLease',
    async (action,thunkAPI) => {
        try {
            const leasingContract = thunkAPI.getState().leasing.contract;
            const erc721Contract = thunkAPI.getState().erc721.contract;
            const { account } = thunkAPI.getState().polka;
            const injector = await web3FromAddress(account.address);

            const approveGasConsumed = (await erc721Contract.query.approve(account.address,{ value: 0,gasLimit: -1 },leasingAddress,action.token_id)).gasConsumed;
            const output1 = await erc721Contract.tx
                .approve({ value: 0,gasLimit: Number(approveGasConsumed) },leasingAddress,action.token_id)
                .signAndSend(account.address,{ signer: injector.signer });
            console.log(output1);

            const { gasConsumed } = await leasingContract.query.listToken(account.address,{ value: 0,gasLimit: -1 },erc721Address,action.token_id,account.address,Number(action.amount),Number(action.duration));
            const output2 = await leasingContract.tx
                .listToken({ value: 0,gasLimit: Number(gasConsumed) },erc721Address,action.token_id,account.address,Number(action.amount),Number(action.duration))
                .signAndSend(account.address,{ signer: injector.signer });
            console.log(output2);

            return true;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
)

const leasingSlice = createSlice({
    name: "leasingReducer",
    initialState: {
        contract: null,
        output: null,
        allLeases: [],
    },
    extraReducers: {
        [initleasingContract.fulfilled]: (state,action) => {
            state.contract = action.payload.contract;
        },
        [listLeases.fulfilled]: (state,action) => {
            state.allLeases = action.payload.allLeases;
        }
    }
})

export const leasingReducer = leasingSlice.reducer;
export const { updateAllLeases } = leasingSlice.actions;
