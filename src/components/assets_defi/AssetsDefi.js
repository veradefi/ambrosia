import React,{ useState,useEffect } from 'react';
import { Col,Container,Row } from 'react-bootstrap';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Assets from './assets/Assets';
import Defi from './defi/Defi';
import './AssetsDefi.css';

function LeasingLanding(props) {
    const [path,setPath] = useState(null);
    const [key,setKey] = useState(null);

    useEffect(() => {
        setPath(props.location.pathname)
    },[props.location.pathname,key])

    return (
        <Container fluid className='mx-auto my-auto'>
            <Container>
                <Row>
                    <Col>
                        <Tabs className='mt-4'
                            activeKey={path || key}
                            onSelect={(k) => { setPath(k) }}
                            id="noanim-tab-example">
                            <Tab eventKey="/assets" title="Assets">
                                <Assets />
                            </Tab>
                            <Tab eventKey="/defi" title="Defi">
                                <Defi />
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
            </Container>
        </Container>
    )
}

export default LeasingLanding
