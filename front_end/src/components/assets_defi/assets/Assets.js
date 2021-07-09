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
import React, { useEffect, useState } from 'react';
import { Table, Button, Space } from 'antd';
import { Col, Container, Row } from 'react-bootstrap';
import 'antd/dist/antd.css';
import '../AssetsDefi.css'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateErc20Balance } from '../../../store/erc20_reducer';

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

function Assets() {
    const [sf, setSf] = useState({
        filteredInfo: null,
        sortedInfo: null,
    })

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

    const handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);

        setSf({
            filteredInfo: null,
            sortedInfo: null,
        });
    };

    const { account, balances } = useSelector((state) => state.polka);
    const erc20Balance = useSelector(state => state.erc20.balance);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(updateErc20Balance());
        const interval = setInterval(() => { dispatch(updateErc20Balance()) }, 2000);
        return () => {
            clearInterval(interval);
        }
    });

    let { sortedInfo, filteredInfo } = sf;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            filteredValue: filteredInfo.title || null,
            onFilter: (value, record) => record.title.includes(value),
            sorter: (a, b) => a.title.length - b.title.length,
            sortOrder: sortedInfo.columnKey === 'title' && sortedInfo.order,
            ellipsis: true,
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            sorter: (a, b) => a.address - b.address,
            sortOrder: sortedInfo.columnKey === 'address' && sortedInfo.order,
            ellipsis: true,
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            filteredValue: filteredInfo.amount || null,
            onFilter: (value, record) => record.amount.includes(value),
            sorter: (a, b) => a.amount.length - b.amount.length,
            sortOrder: sortedInfo.columnKey === 'amount' && sortedInfo.order,
            ellipsis: true,
        },
        {
            title: 'Action',
            dataIndex: 'address',
            render(text, record) {
                return {
                    children:
                        <div className='action-btn ' >
                            <button>Cashout Loan</button>
                            <button>Lease</button>
                        </div>
                };
            },
            sortOrder: sortedInfo.columnKey === 'address' && sortedInfo.order,
            ellipsis: true,
        },
    ];
    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <Space className='mt-5 pl-5' style={{ width: '100%', marginBottom: 16 }}>
                            <div className='assets-main'>
                                <div>Tokens</div>
                            </div>
                        </Space>
                        <div className='token-details'>
                            {/* <div className='token-first-col' >
                                <div>a</div>
                                <div>P</div>
                                <div>V</div>
                                <div>V</div>
                            </div> */}
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
                        <Table columns={columns} dataSource={data} onChange={handleChange} />
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Assets;