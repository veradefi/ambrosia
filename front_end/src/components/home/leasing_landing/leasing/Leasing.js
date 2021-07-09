// Copyright 2021 Vera http://vera.financial/
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import { Table, Space } from 'antd';
import 'antd/dist/antd.css';
import '../../Home.css';
import { useDispatch, useSelector } from 'react-redux';
import { addLease, listLeases, rentLease } from '../../../../store/leasing_reducer';

function Leasing() {
    const [sf, setSf] = useState({
        filteredInfo: null,
        sortedInfo: null,
    })
    const [addNew, setAddNew] = useState(false);
    const [formId, setFormId] = useState('');
    const [formAmount, setFormAmount] = useState(0);
    const [formDuration, setFormDuration] = useState(0);

    const handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);

        setSf({
            filteredInfo: null,
            sortedInfo: null,
        });
    };

    const { account } = useSelector((state) => state.polka);
    const leasingContract = useSelector(state => state.leasing.contract);
    const allLeases = useSelector(state => state.leasing.allLeases);
    const dispatch = useDispatch();
    useEffect(() => {
        if (account) {
            dispatch(listLeases());
        }
    }, [leasingContract, account, allLeases]);

    let { sortedInfo, filteredInfo } = sf;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
        {
            title: 'Token',
            dataIndex: 'token_id',
            key: 'token_id',
            filteredValue: filteredInfo.title || null,
            onFilter: (value, record) => record.title.includes(value),
            sorter: (a, b) => a.title.length - b.title.length,
            sortOrder: sortedInfo.columnKey === 'token_id' && sortedInfo.order,
            ellipsis: true,
        },
        {
            title: 'Address',
            dataIndex: 'beneficiary_address',
            key: 'beneficiary_address',
            sorter: (a, b) => a.address - b.address,
            sortOrder: sortedInfo.columnKey === 'beneficiary_address' && sortedInfo.order,
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
            title: 'Term',
            dataIndex: 'duration',
            key: 'duration',
            filteredValue: filteredInfo.term || null,
            onFilter: (value, record) => record.term.includes(value),
            sorter: (a, b) => a.term.length - b.term.length,
            sortOrder: sortedInfo.columnKey === 'duration' && sortedInfo.order,
            ellipsis: true,
        },
        {
            title: 'Action',
            dataIndex: 'address',
            render(text, record) {
                return {
                    children: <div className='action-btn' >
                        <button onClick={
                            () => dispatch(rentLease({ id: record.id, amount: record.amount }))
                        }>Rent</button>
                    </div>
                };
            },
            sortOrder: sortedInfo.columnKey === 'address' && sortedInfo.order,
            ellipsis: true,
        },
    ];


    return (
        <>
            {addNew === false && (
                <div>
                    <Space className='mt-5' style={{ marginBottom: 16 }}>
                    </Space>
                    <div className='l-l-heading' >
                        <div>Leasing</div>
                        <div><button onClick={() => setAddNew(true)}>Add New</button></div>
                    </div>
                    <div className='l-l-para' >Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime exercitationem
                    corporis omnis itaque sunt dicta iste nam mollitia amet eos earum accusantium sint
                    explicabo similique quasi porro maiores, ullam commodi.
                    </div>
                    <Table columns={columns} dataSource={allLeases} onChange={handleChange} />
                </div>
            )}
            {addNew === true && (
                <div>
                    <Container>
                        <Row>
                            <Col lg={8} className='offset-lg-2'>
                                <div className='second-row'>
                                    <div className='second-row-item'>
                                        <Form.Group>
                                            <Form.Row>
                                                <Form.Label column lg={4}>
                                                    Token ID
                                                </Form.Label>
                                                <Col>
                                                    {/* <Form.Control as="select">
                                                        <option>Monalisa</option>
                                                        <option>Tom cruise</option>
                                                        <option>Arnold</option>
                                                        <option>Heavy Machine</option>
                                                        <option>Iron Man</option>
                                                    </Form.Control> */}
                                                    <Form.Control type="text" onChange={(e) => {
                                                        setFormId(e.target.value);
                                                    }} />
                                                </Col>
                                            </Form.Row>
                                            <br />
                                            <Form.Row>
                                                <Form.Label column lg={4}>
                                                    Loan duration
                                                </Form.Label>
                                                <Col>
                                                    <Form.Control type="number" onChange={(e) => {
                                                        setFormDuration(e.target.value);
                                                    }} />
                                                </Col>
                                            </Form.Row>
                                            <br />
                                            <Form.Row>
                                                <Form.Label column lg={4}>
                                                    Loan Amount
                                                </Form.Label>
                                                <Col>
                                                    <Form.Control type="number" onChange={(e) => {
                                                        setFormAmount(e.target.value);
                                                    }} />
                                                </Col>
                                            </Form.Row>
                                            <br />
                                            <br />
                                        </Form.Group>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={8} md={8} className='offset-lg-2 offset-md-2'>
                                <div className='third-row'>
                                    <Button variant="secondary" size="lg" onClick={() => setAddNew(false)}>Cancel</Button>
                                    <Button variant="success" size="lg" onClick={() => {
                                        dispatch(addLease({ token_id: formId, amount: formAmount, duration: formDuration })).then((result) =>
                                            setAddNew(false));
                                    }}>Add</Button>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            )}
        </>
    );
}

export default Leasing;