import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Leading from './leading/leading';
import Leasing from './leasing/Leasing';

function LeasingLanding(props) {
    const [path, setPath] = useState(null);
    const [key, setKey] = useState(null);
    // const [hideLeasing, setHideLeasing] = useState(null)

    useEffect(() => {
        setPath(props.location.pathname)
    },[props.location.pathname, key])
    return (
        <Container fluid className='mx-auto my-auto'>
            <Container>
                <Row>
                    <Col>
                    <Tabs className='mt-4'
                            activeKey={path || key}
                            onSelect={(k) => {setPath(k)}}
                            id="noanim-tab-example">
                            <Tab eventKey="/leading" title="Leading">
                                {/* <div className='l-l-heading' >
                                    <div>Leading</div>
                                    <div><button >Add New</button></div>
                                </div> */}
                                <Leading />
                            </Tab>
                            <Tab eventKey="/leasing" title="Leasing">
                                {/* <div className='l-l-heading' >
                                    <div>Leasing</div>
                                    <div><button>Add New</button></div>
                                </div> */}
                                <Leasing />
                            </Tab>
                            <Tab eventKey="trading" title="Trading" disabled>
                                disable
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
            </Container>
        </Container>
    )
}

export default LeasingLanding
