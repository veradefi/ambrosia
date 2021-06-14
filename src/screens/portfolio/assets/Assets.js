import React,{ useEffect } from 'react';
import { Col,Container,Row } from 'react-bootstrap';
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
        const interval = setInterval(() => { dispatch(updateErc20Balance()) },2000);
        return () => {
            clearInterval(interval);
        }
    });

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <div className='mt-5 pl-5' style={{ width: '100%',marginBottom: 16 }}>
                            <div className='assets-main'>
                                <div>Tokens</div>
                            </div>
                        </div>
                        <div className='token-details'>
                            <div className='token-second-col'>
                                <div>Token name</div>
                                <div>Polkadot</div>
                                <div>ERC20</div>
                            </div>
                            <div className='token-third-col'>
                                <div>Balance</div>
                                <div>{(String(balances[account.address]))}</div>
                                <div>{fixDecimals(erc20Balance)}</div>
                            </div>
                        </div>
                        <div className='nft-add'>
                            <div>NFTs</div>
                            <div>
                                <Link to='/issue_nft'>
                                    <button>Add New</button>
                                </Link>
                            </div>
                        </div>
                        <AssetsTable data={data} />
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Assets;