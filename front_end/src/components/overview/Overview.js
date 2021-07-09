// Copyright 2021 Vera http://vera.financial/
import React,{ useState } from 'react';
import { Col,Container,Row } from 'react-bootstrap';
import Table from 'react-bootstrap/Table'
import Dot from '../../images/DOT-image.svg';
import Ksm from '../../images/KSM-image.svg';
import Btc from '../../images/BTC-image.svg';
import Usdt from '../../images/USDT-image.svg';
import XDot from '../../images/xDOT-image.svg';

function Overview() {
    const [supplyBorder,setSupplyBorder] = useState(false);
    const [borrowBorder,setBorrowBorder] = useState(false);

    const handleSbBorder = (e) => {
        e.target.outerText === 'Supply' ? setSupplyBorder(true) : setSupplyBorder(false);
        e.target.outerText === 'Borrow' ? setBorrowBorder(true) : setBorrowBorder(false);
    }

    return (
        <Container fluid>
            <div className='first-row-wrapper'>
                <Row>
                    <Col lg={4} md={4}>
                        <div className='first-row-txt-1'>
                            <h3>$50,182,307.1241</h3>
                            <h3>Supplied</h3>
                        </div>
                    </Col>
                    <Col lg={4} md={4}>
                        <div className='first-row-txt-2'>
                            <h3>$50,182,307.1241</h3>
                            <h3>Earned</h3>
                        </div>
                    </Col>
                    <Col lg={4} md={4}>
                        <div className='first-row-txt-3'>
                            <h3>$50,182,307.1241</h3>
                            <h3>Borrowed</h3>
                        </div>
                    </Col>
                </Row>
            </div>
            <Row>
                <Col lg={12} md={12} sm={12}>
                    <div className='second-row-wrapper-container'>
                        <div className='second-row-wrapper'>
                            <div className='sb-comp'>
                                <div className={`supply ${supplyBorder ? 'sup-bor' : ''}`} onClick={(e) => handleSbBorder(e)}>supply</div>
                                <div className={`borrow ${borrowBorder ? 'bor-bor' : ''}`} onClick={(e) => handleSbBorder(e)}>borrow</div>
                            </div>
                            <div className='sb-table'>
                                <Table className="table table-hover" striped underline="true" hover responsive="sm" size='lg' style={{ color: 'white' }}>
                                    <thead >
                                        <tr style={{ width: '100%' }}>
                                            <th className='table-head'>Asset</th>
                                            <th className='table-head'>Supply APY</th>
                                            <th className='table-head'>Market Supply</th>
                                            <th className='table-head'>Parallel Balance</th>
                                            <th className='table-head'>Supply Balance</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td> <img src={Dot} alt='Dot' />DOT</td>
                                            <td>10.51%</td>
                                            <td>$42,014</td>
                                            <td>0</td>
                                            <td>269.3701</td>
                                        </tr>
                                        <tr>
                                            <td><img src={Ksm} alt='Ksm' />KSM</td>
                                            <td>2.10%</td>
                                            <td>$419,704</td>
                                            <td>541</td>
                                            <td>503.0235</td>
                                        </tr>
                                        <tr>
                                            <td><img src={Btc} alt='Btc' />BTC</td>
                                            <td>0.00%</td>
                                            <td>$50,487,164</td>
                                            <td>194</td>
                                            <td>907.1203</td>
                                        </tr>
                                        <tr>
                                            <td><img src={Usdt} alt='Usdt' />USDT</td>
                                            <td>9.46%</td>
                                            <td>$815</td>
                                            <td>1,421</td>
                                            <td>0.0061</td>
                                        </tr>
                                        <tr>
                                            <td><img src={XDot} alt='xDot' />xDOT</td>
                                            <td>0.53%</td>
                                            <td>$29,537</td>
                                            <td>1,258</td>
                                            <td>0.0974</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Overview
