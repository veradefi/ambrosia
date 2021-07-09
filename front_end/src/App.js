// Copyright 2021 Vera http://vera.financial/
import React,{ useEffect,useState } from 'react';
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom';
// import Home from './components/home/Home';
import LeasingLanding from './components/home/leasing_landing/LeasingLanding';
import './components/home/Home.css';
import Sidebar from './components/sidebar/Sidebar';
import Overview from './components/overview/Overview';
import UserImg from '../src/images/user.png';
import IssueNft from './components/nft/IssueNft';
import * as RiIcons from 'react-icons/ri';
import AssetsDefi from './components/assets_defi/AssetsDefi'
import { initAccounts,initPolkaDot,switchAccount,updateBalance } from './store/polka_reducer';
import { useDispatch,useSelector } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import './components/home/Home.css';
import { updateMyNfts } from './store/erc721_reducer';
import { updateErc20Balance } from './store/erc20_reducer';

function App() {
  const [toggle,setToggle] = useState(false);
  const dispatch = useDispatch();
  const { api,connected,accounts,account } = useSelector((state) => state.polka);

  useEffect(() => {
    if (connected && accounts) {
      const addresses = accounts.map(account => account.address);
      let unsubscribeAll = null;

      api.query.system.account
        .multi(addresses,balances => {
          dispatch(updateBalance({ addresses: addresses,balances: balances }));
        }).then(unsub => {
          unsubscribeAll = unsub;
        }).catch(console.error);

      return () => unsubscribeAll && unsubscribeAll();
    }
  },[api,accounts,updateBalance]);

  return (
    (!connected) ?
      <div className='wallet-connect-btn'>
        <button onClick={() => { dispatch(initPolkaDot()) }}>Connect Wallet</button>
      </div> :
      <Router>
        <div className='d-flex' id="wrapper">
          <div className={`bg-sidebar ${toggle ? 't-btn' : 't-btn-block'}`} id="sidebar-wrapper">
            <Sidebar />
          </div>
          <div id="page-content-wrapper">
            <nav className="navbar navbar-expand-lg nav-fixed-1025 bg-body">
              <div className='ml-auto nav-btn '>
                <button className="user-btn">
                  <span className="pl-2">
                    <img src={UserImg} alt="User Avatar" />
                  </span>
                  <span className="pr-2">
                    <Dropdown onSelect={(event) => {
                      dispatch(initAccounts()).then((result) => {
                        dispatch(switchAccount(event));
                        dispatch(updateMyNfts());
                        dispatch(updateErc20Balance());
                      });
                    }}>
                      <Dropdown.Toggle id="dropdown-basic">
                        {account.meta.name}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        {accounts.map((acc) => {
                          return (acc.address === account.address) ? null : (<Dropdown.Item eventKey={acc.address}>{acc.meta.name}</Dropdown.Item>);
                        })}
                      </Dropdown.Menu>
                    </Dropdown>
                  </span>
                </button>
                <span className={`menu-btn ml-2 `} id="menu-toggle" onClick={() => setToggle(!toggle)}><RiIcons.RiMenu2Line /></span>
              </div>
            </nav>
            <div className='content-container-main' >
              <Switch>
                <Route path='/' exact component={Overview} />
                {/* <Route path='#' exact component={LeasingLanding} /> */}
                <Route path='/leading' exact component={LeasingLanding} />
                <Route path='/leasing' exact component={LeasingLanding} />
                <Route path='/assets' exact component={AssetsDefi} />
                <Route path='/defi' exact component={AssetsDefi} />
                <Route path='/issue_nft' exact component={IssueNft} />
              </Switch>
            </div>
          </div>
        </div>



        {/* <Switch>
        <Route to='/overview'>
          <Home />
        </Route>
        <Route to='/'>
          <LeasingLanding />
        </Route>
      </Switch> */}
      </Router>
  );
}

export default App;
