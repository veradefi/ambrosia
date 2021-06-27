import React,{ useState,useEffect } from 'react';
import { Col,Container,Row } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab'
import Leading from './leading/Leading';
import Leasing from './leasing/Leasing';
import { CustomTabs } from 'components/Common';


export const HomeScreen = (props) => {
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
                            <Tab eventKey="/leading" title="Leading">
                                <Leading />
                            </Tab>
                            <Tab eventKey="/leasing" title="Leasing">
                                <Leasing />
                            </Tab>
                        </CustomTabs>
                    </Col>
                </Row>
            </Container>
        </Container>
    )
}
