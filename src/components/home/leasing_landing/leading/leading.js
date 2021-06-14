import React,{ useEffect,useState } from 'react';
import { Col,Container,Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import { useDispatch,useSelector } from 'react-redux';
import { addLoan,lendLoan,listAvailableLoans } from '../../../../store/lending_reducer';

const LeadingTable = ({ data,lendLoan }) => (
    <table className="table table-striped  text-white">
        <thead>
            <tr>
                <th>Token</th>
                <th>Address</th>
                <th>Amount</th>
                <th>Term</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {(data || []).map(item => <tr key={item.id}>
                <td>{item.token_id}</td>
                <td>{item.nft_address}</td>
                <td>{item.amount}</td>
                <td>{item.duration}</td>
                <td>
                    <button className="btn btn-info" onClick={() => lendLoan(item)}>Lend</button>
                </td>
            </tr>)}
        </tbody>
    </table>
)

function Leading(props) {

    const [addNew,setAddNew] = useState(false);
    const [formId,setFormId] = useState('');
    const [formAmount,setFormAmount] = useState(0);
    const [formDuration,setFormDuration] = useState(0);

    const { account } = useSelector((state) => state.polka);
    const lendingContract = useSelector(state => state.lending.contract);
    const allLoans = useSelector(state => state.lending.allLoans);
    const dispatch = useDispatch();
    useEffect(() => {
        if (account) {
            dispatch(listAvailableLoans());
        }
    },[lendingContract,account,allLoans]);

    const lendLoan = (record) => {
        dispatch(lendLoan({ id: record.id,amount: record.amount }))
    }

    return (
        <>
            {!addNew && (
                <div>
                    <div className='mt-5' style={{ marginBottom: 16 }}>
                    </div>
                    <div className='l-l-heading' >
                        <div>Leading</div>
                        <div><button onClick={() => setAddNew(true)}>Add New</button></div>
                    </div>
                    <div className='l-l-para' >Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime exercitationem
                        corporis omnis itaque sunt dicta iste nam mollitia amet eos earum accusantium sint
                        explicabo similique quasi porro maiores, ullam commodi.
                    </div>
                    <LeadingTable data={allLoans} lendLoan={lendLoan} />
                </div>
            )}
            {addNew && (
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
                                                    Daily rent amount
                                                </Form.Label>
                                                <Col>
                                                    <Form.Control type="text" onChange={(e) => {
                                                        setFormAmount(e.target.value);
                                                    }} />
                                                </Col>
                                            </Form.Row>
                                            <br />
                                            <Form.Row>
                                                <Form.Label column lg={4}>
                                                    Max lease duration
                                                </Form.Label>
                                                <Col>
                                                    <Form.Control type="text" onChange={(e) => {
                                                        setFormDuration(e.target.value);
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
                                        dispatch(addLoan({ token_id: formId,amount: formAmount,duration: formDuration })).then((result) =>
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

export default Leading;