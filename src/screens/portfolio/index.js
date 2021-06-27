import React,{ useState,useEffect } from 'react';
import { Col,Container,Row } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab'
import Assets from './assets/Assets';
import Defi from './defi/Defi';
import { CustomTabs } from 'components/Common';

export const PortfolioScreen = (props) => {
    const [path,setPath] = useState(null);

    useEffect(() => {
        setPath(props.location.pathname)
    },[props.location.pathname])

    return (
        <Container fluid className='mx-auto my-auto'>
            <Container>
                <Row>
                    <Col>
                        <CustomTabs className='mt-4'
                            activeKey={path}
                            onSelect={(k) => { setPath(k) }}
                            id="noanim-tab-example">
                            <Tab eventKey="/assets" title="Assets">
                                <Assets />
                            </Tab>
                            <Tab eventKey="/defi" title="Defi">
                                <Defi />
                            </Tab>
                        </CustomTabs>
                    </Col>
                </Row>
            </Container>
        </Container>
    )
}

