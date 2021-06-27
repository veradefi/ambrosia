import React,{ useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { updateErc20Balance } from 'store/erc20_reducer';

const data = [
    {
        key: '1',
        title: 'title 1',
        address: 0x111111111,
        amount: '100 USD',
        term: '4 Month',
    },
    {
        key: '2',
        title: 'title 2',
        address: 0x22222222,
        amount: '200 USD',
        term: '5 Month',
    },
];

const balanceSuffix = [
    ' Unit',
    ' kUnit',
    ' mUnit',
    ' bUnit',
    ' tUnit',
]

const AssetsTable = ({ data }) => (
    <table className="table table-striped  text-white">
        <thead>
            <tr>
                <th>Title</th>
                <th>Address</th>
                <th>Amount</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {(data || []).map(item => <tr key={item.key}>
                <td>{item.title}</td>
                <td>{item.address}</td>
                <td>{item.amount}</td>
                <td>
                    <button className="btn btn-info">Cashout Loan</button>
                    <button className="btn btn-info ml-2">Lease</button>
                </td>
            </tr>)}
        </tbody>
    </table>
)

const Assets = () => {

    const fixDecimals = (val) => {
        let unitIndex = 0;
        val = Number(val);
        while (unitIndex < 3) {
            if (val >= 1000) {
                val /= 1000;
                unitIndex++;
            }
            else {
                break;
            }
        }
        const decimals = String(val).split('.')[1];
        if (decimals && decimals.length > 4)
            val = val.toFixed(4);

        return String(val) + balanceSuffix[unitIndex];
    }

    const { account,balances } = useSelector((state) => state.polka);
    const erc20Balance = useSelector(state => state.erc20.balance);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(updateErc20Balance());
    });

    return (
        <>


            <div className='my-3'>
                <p className="lead font-weight-bold">Tokens</p>
            </div>
            <div className='row mx-0'>
                <div className='col-2  border py-2'>
                    <div>Token name</div>
                    <div>Polkadot</div>
                    <div>ERC20</div>
                </div>
                <div className='col-2  border py-2'>
                    <div>Balance</div>
                    <div>{(String(balances[account?.address]))}</div>
                    <div>{fixDecimals(erc20Balance)}</div>
                </div>
            </div>
            <div className='d-flex my-3 justify-content-between align-items-center'>
                <p className="lead font-weight-bold m-0">NFTs</p>
                <Link to='/issue_nft'>
                    <button className="btn btn-success">Add New</button>
                </Link>
            </div>
            <AssetsTable data={data} />

        </>
    );
}

export default Assets;