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
import React,{ useEffect,useState } from 'react';
import { Col,Container,Row } from 'react-bootstrap';
import { useDispatch,useSelector } from 'react-redux';
import { withdrawLoan } from '../../../store/lending_reducer';

function Defi() {
    const { activeLoans,activeLends,activeLeases,activeRents } = useSelector(state => state.erc721)
    const dispatch = useDispatch();

    return (
        <Container>
            <Row>
                <Col lg={12} >
                    <div className='lending-heading'>Lending</div>
                </Col>
                <Col lg={12} className='active-border'>
                    <Col lg={12}>
                        <div className='active-loans'>Active Loans</div>
                    </Col>
                    <Col lg={12} md={12}>
                        <Row>
                            <Col lg={12} md={12}>
                                <div className='active-container'>
                                    {
                                        activeLoans.map((loan) => {
                                            return (<div className='active-item'>
                                                <span><img src="" alt="Loan" /></span>
                                                <span>Token ID: {loan.token_id}</span>
                                                <span>Amount: {loan.amount}</span>
                                                <div className='action-btn'>
                                                    <button onClick={() => {
                                                        dispatch(withdrawLoan({ id: loan.id,amount: loan.amount }));
                                                    }}>Payoff</button>
                                                </div>
                                            </div>);
                                        })
                                    }
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col lg={12}>
                        <div className='active-loans'>Active Lendings</div>
                    </Col>
                    <Col lg={12} md={12}>
                        <Row>
                            <Col lg={12} md={12}>
                                <div className='active-container-2nd'>
                                    {
                                        activeLends.map((lend) => {
                                            return (<div className='active-item'>
                                                <span><img src="" alt="Loan" /></span>
                                                <span>Token ID: {lend.token_id}</span>
                                                <span>Amount: {lend.amount}</span>
                                                <div className='action-btn'>
                                                    <button>Cancel Loan</button>
                                                </div>
                                            </div>);
                                        })
                                    }
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Col>
            </Row>


            <Row>
                <Col lg={12} >
                    <div className='lending-heading'>Leasing</div>
                </Col>
                <Col lg={12} className='active-border'>
                    <Col lg={12}>
                        <div className='active-loans'>Active Renting</div>
                    </Col>
                    <Col lg={12} md={12}>
                        <Row>
                            <Col lg={12} md={12}>
                                <div className='active-container'>
                                    {
                                        activeRents.map((rent) => {
                                            return (<div className='active-item'>
                                                <span><img src="" alt="Loan" /></span>
                                                <span>Token ID: {rent.token_id}</span>
                                                <span>Amount: {rent.amount}</span>
                                                <div className='action-btn'>
                                                    <button>Payoff</button>
                                                </div>
                                            </div>);
                                        })
                                    }
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col lg={12}>
                        <div className='active-loans'>Active Leasing</div>
                    </Col>
                    <Col lg={12} md={12}>
                        <Row>
                            <Col lg={12} md={12}>
                                <div className='active-container-2nd'>
                                    {
                                        activeLeases.map((lease) => {
                                            return (<div className='active-item'>
                                                <span><img src="" alt="Loan" /></span>
                                                <span>Token ID: {lease.token_id}</span>
                                                <span>Amount: {lease.amount}</span>
                                                <div className='action-btn'>
                                                    <button>Cancel Lease</button>
                                                </div>
                                            </div>);
                                        })
                                    }
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Col>
            </Row>
        </Container >
    )
}

export default Defi;
