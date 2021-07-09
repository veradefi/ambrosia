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
