import { ContractPromise } from "@polkadot/api-contract";
import { web3FromAddress } from "@polkadot/extension-dapp";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import lendingAbi from '../../lendingmanager/metadata.json';
import { lendingAddress,erc721Address } from '../../addresses.json';
import { bnToBn } from "@polkadot/util";

const fromUnit = (val) => {
    return bnToBn(Number(val) * 1000000000000);
}

export const initLendingContract = createAsyncThunk(
    'InitLendingContract',
    async (action,thunkAPI) => {
        try {
            const contract = new ContractPromise(action,lendingAbi,lendingAddress);
            console.log("Lending Contract: ",contract);
            return {
                contract
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
)

export const listAvailableLoans = createAsyncThunk(
    'ListAvailableLoans',
    async (action,thunkAPI) => {
        try {
            const { contract } = thunkAPI.getState().lending;
            const { account } = thunkAPI.getState().polka;
            if (contract == null || account == null)
                throw 'Contract and/or account not initialized';
            const output = (await contract.query.listAvailableLoans(account.address,{ value: 0 })).output;
            const allLoans = [];
            for (let i = 0; i < (output || []).length; ++i) {
                allLoans.push({
                    'id': String(output[i].id),
                    'token_id': String(output[i].token_id),
                    'duration': String(output[i].duration),
                    'amount': String(output[i].amount),
                    'nft_address': String(output[i].nft_address),
                    'beneficiary_address': String(output[i].beneficiary_address),
                });
            }
            return {
                allLoans,
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
)

export const lendLoan = createAsyncThunk(
    'LendLoans',
    async (action,thunkAPI) => {
        try {
            const lendingContract = thunkAPI.getState().lending.contract;
            const { account } = thunkAPI.getState().polka;
            const erc20Contract = thunkAPI.getState().erc20.contract;
            if (lendingContract == null || account == null || erc20Contract == null)
                throw 'Contract and/or account not initialized';
            const injector = await web3FromAddress(account.address);
            const approveGasConsumed = (await erc20Contract.query.approve(account.address,{ value: 0,gasLimit: -1 },lendingAddress,fromUnit(action.amount))).gasConsumed;
            const approvehash = await erc20Contract.tx
                .approve({ value: 0,gasLimit: Number(approveGasConsumed) },lendingAddress,fromUnit(action.amount))
                .signAndSend(account.address,{ signer: injector.signer });
            console.log(approvehash);

            const lendGasConsumed = (await lendingContract.query.lend(account.address,{ value: 0,gasLimit: -1 },action.id)).gasConsumed;
            const lendHash = await lendingContract.tx
                .lend({ value: 0,gasLimit: Number(lendGasConsumed) },action.id)
                .signAndSend(account.address,{ signer: injector.signer });
            console.log(lendHash);
            return true;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
)

export const withdrawLoan = createAsyncThunk(
    'WithdrawLoans',
    async (action,thunkAPI) => {
        try {
            const lendingContract = thunkAPI.getState().lending.contract;
            const { account } = thunkAPI.getState().polka;
            const erc20Contract = thunkAPI.getState().erc20.contract;
            if (lendingContract == null || account == null || erc20Contract == null)
                throw 'Contract and/or account not initialized';
            const injector = await web3FromAddress(account.address);

            const interest = Number((await lendingContract.query.getInterestRate(account.address,{ value: 0 })).output);

            const amount = fromUnit(action.amount * (1 + interest / 100));

            const approveGasConsumed = (await erc20Contract.query.approve(account.address,{ value: 0,gasLimit: -1 },lendingAddress,amount)).gasConsumed;
            const output1 = await erc20Contract.tx
                .approve({ value: 0,gasLimit: Number(approveGasConsumed) },lendingAddress,amount)
                .signAndSend(account.address,{ signer: injector.signer });
            console.log(output1);

            const lendGasConsumed = (await lendingContract.query.withdraw(account.address,{ value: 0,gasLimit: -1 },action.id)).gasConsumed;
            const output2 = await lendingContract.tx
                .withdraw({ value: 0,gasLimit: Number(lendGasConsumed) },action.id)
                .signAndSend(account.address,{ signer: injector.signer });
            console.log(output2);

            return true;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
)

export const addLoan = createAsyncThunk(
    'AddLoan',
    async (action,thunkAPI) => {
        try {
            const lendingContract = thunkAPI.getState().lending.contract;
            const erc721Contract = thunkAPI.getState().erc721.contract;
            const { account } = thunkAPI.getState().polka;
            const injector = await web3FromAddress(account.address);

            const approveGasConsumed = (await erc721Contract.query.approve(account.address,{ value: 0,gasLimit: -1 },lendingAddress,action.token_id)).gasConsumed;
            const output1 = await erc721Contract.tx
                .approve({ value: 0,gasLimit: Number(approveGasConsumed) },lendingAddress,action.token_id)
                .signAndSend(account.address,{ signer: injector.signer });
            console.log(output1);

            const { gasConsumed } = await lendingContract.query.listToken(account.address,{ value: 0,gasLimit: -1 },erc721Address,action.token_id,account.address,Number(action.amount),Number(action.duration));
            const output2 = await lendingContract.tx
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

const lendingSlice = createSlice({
    name: "LendingReducer",
    initialState: {
        contract: null,
        output: null,
        allLoans: [],
    },
    extraReducers: {
        [initLendingContract.fulfilled]: (state,action) => {
            state.contract = action.payload.contract;
        },
        [listAvailableLoans.fulfilled]: (state,action) => {
            state.allLoans = action.payload.allLoans;
        },
    }
})

export const lendingReducer = lendingSlice.reducer;
export const { updateAllLoans } = lendingSlice.actions;
