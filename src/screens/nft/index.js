import React,{ useState } from 'react';
import { Col,Container,Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useDispatch } from 'react-redux';
import { mintNft } from 'store/erc721_reducer';
import './index.css';

export const NFTScreen = () => {
    const [formId,setFormId] = useState('');
    const dispatch = useDispatch();

    return (
        <Container>
            <Row>
                <Col md={12}>
                    <Row>
                        <Col lg={12} md={12}>
                            <div className='first-row'>
                                <div>Issue NFT</div>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={12}>
                            <div className='second-row'>
                                <div className='second-row-item'>
                                    <Form.Group>
                                        <Form.Row>
                                            <Form.Label column lg={4}>
                                                NFT ID
                                            </Form.Label>
                                            <Col>
                                                <Form.Control type="text" value={formId} onChange={(e) => {
                                                    setFormId(e.target.value);
                                                }} />
                                            </Col>
                                        </Form.Row>
                                        <br />
                                        {/* <Form.Row>
                                            <Form.Label column lg={4}>
                                                Meta URL
                                    </Form.Label>
                                            <Col>
                                                <Form.Control type="text" placeholder="Meta URL" />
                                            </Col>
                                        </Form.Row>
                                        <br />
                                        <Form.Row>
                                            <Form.Label column lg={4}>
                                                Description
                                    </Form.Label>
                                            <Col>
                                                <Form.Control type="text" placeholder="Description" />
                                            </Col>
                                        </Form.Row>
                                        <br />
                                        <Form.Row>
                                            <Form.Label column lg={4}>
                                                Value
                                    </Form.Label>
                                            <Col>
                                                <Form.Control type="text" placeholder="Value" />
                                            </Col>
                                        </Form.Row>
                                        <br /> */}
                                    </Form.Group>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={12} md={12}>
                            <div className='third-row'>
                                <Button className='' variant="success" size="lg" onClick={() => {
                                    dispatch(mintNft({ token_id: formId })).then(() => {
                                        setFormId('');
                                    });
                                }}>Create</Button>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}
