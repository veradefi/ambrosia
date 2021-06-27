import React from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { withdrawLoan } from 'store/lending_reducer';

const Item = ({ item,buttonComponent }) => (
    <div className='active-item'>
        <span><img src="" alt="Loan" /></span>
        <span>Token ID: {item.token_id}</span>
        <span>Amount: {item.amount}</span>
        {buttonComponent}
    </div>
)

const Defi = () => {
    const { activeLoans,activeLends,activeLeases,activeRents } = useSelector(state => state.erc721)
    const dispatch = useDispatch();

    const withdrawLoanClicked = (item) => {
        dispatch(withdrawLoan({ id: item.id,amount: item.amount }));
    }

    return (
        <>
            <div className='my-3 border-bottom'>
                <p className="lead font-weight-bold">Lending</p>
            </div>
            <div className="my-2 border-bottom">
                <p className="lead">Active Loans</p>
                <div className="mt-2">
                    {activeLoans.map(item => <Item
                        key={item.id}
                        buttonComponent={<button className="btn btn-success" onClick={() => withdrawLoanClicked(item)}>Payoff</button>}
                        item={item}
                    />)}
                    {activeLoans.length === 0 && <p>No Data found</p>}
                </div>
            </div>
            <div className="my-2 border-bottom">
                <p className="lead">Active Lendings</p>
                <div className="mt-2">
                    {activeLends.map(item => <Item
                        key={item.id}
                        buttonComponent={<button className="btn btn-danger" >Cancel Loan</button>}
                        item={item}
                    />)}

                    {activeLends.length === 0 && <p>No Data found</p>}
                </div>
            </div>

            <div className='my-3 border-bottom'>
                <p className="lead font-weight-bold">Leasing</p>
            </div>
            <div className="my-2 border-bottom">
                <p className="lead">Active Renting</p>
                <div className="mt-2">
                    {activeRents.map(item => <Item
                        key={item.id}
                        buttonComponent={<button className="btn btn-success">Payoff</button>}
                        item={item}
                    />)}
                    {activeRents.length === 0 && <p>No Data found</p>}
                </div>
            </div>
            <div className="my-2 border-bottom">
                <p className="lead">Active Leasing</p>
                <div className="mt-2">
                    {activeLeases.map(item => <Item
                        key={item.id}
                        buttonComponent={<button className="btn btn-danger">Cancel Lease</button>}
                        item={item}
                    />)}
                    {activeLeases.length === 0 && <p>No Data found</p>}
                </div>
            </div>
        </>

    )
}

export default Defi;
