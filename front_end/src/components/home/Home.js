import React, { useState } from 'react';
import './Home.css';
import Sidebar from '../sidebar/Sidebar';
import Overview from '../overview/Overview';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LeasingLanding from './leasing_landing/LeasingLanding';




function Home() {
    const [toggle, setToggle] = useState(false);




    return (
        <Overview />
    )
}

export default Home;
