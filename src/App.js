import React,{ useEffect,useState } from 'react';
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom';
import { HomeScreen } from 'screens/home/';
import { Sidebar } from 'layouts/Sidebar';
import { OverviewScreen } from 'screens/overview';
import UserImg from '../src/images/user.png';
import { NFTScreen } from 'screens/nft';
import * as RiIcons from 'react-icons/ri';
import { PortfolioScreen } from 'screens/portfolio'
import { initAccounts,initPolkaDot,switchAccount,updateBalance } from './store/polka_reducer';
import { useDispatch,useSelector } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import { updateMyNfts } from './store/erc721_reducer';
import { updateErc20Balance } from './store/erc20_reducer';
import styled from 'styled-components';
import { LoadingBar } from 'components/LoadingBar';

const ConnectButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100vh;
  position: fixed;
  width: 100%;
  background: rgb(33 30 46, 0.4);
  z-index: 1;

 button {
  background-color: #89ecd4;
  padding: 2% 3%;
  border-radius: 4px;
  border : 1px solid #89ecd4;

  &:hover{
      background: linear-gradient(150deg, #1f64d2 4.28%,#52cce7 58.39%, #89ecd4 96.37%);
      color: #ffffff;
      border: 0;
  }
}
`

const Container = styled.div`
  display :  flex;
  overflow-x: hidden;
  filter : ${({ connected }) => !connected ? "blur(4px)" : "none"};

  .toggled #sidebar-wrapper {
    margin-left: 0;
  }
`

function App() {
  const [toggle,setToggle] = useState(false);
  const [connecting,setConnecting] = useState(false);
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

  const accountChangedClicked = (event) => {
    dispatch(initAccounts()).then(() => {
      dispatch(switchAccount(event));
      dispatch(updateMyNfts());
      dispatch(updateErc20Balance());
    });
  }

  const connectClicked = async () => {
    try {
      setConnecting(true);
      await dispatch(initPolkaDot())
    } finally {
      setConnecting(false);
    }
  }

  return (
    <>
      {!connected && !connecting &&
        <ConnectButtonContainer>
          <button onClick={connectClicked}>Connect Wallet</button>
        </ConnectButtonContainer>
      }
      {connecting && <LoadingBar message="Connecting" />}
      <Router>
        <Container id="wrapper" connected={connected}>
          <div className={`bg-sidebar ${toggle ? 't-btn' : 't-btn-block'}`} id="sidebar-wrapper">
            <Sidebar />
          </div>
          <div id="page-content-wrapper">
            <nav className="navbar navbar-expand-lg nav-fixed-1025 bg-body">
              <div className='ml-auto nav-btn '>
                <div className="user-btn">
                  <span className="pl-2">
                    <img src={UserImg} alt="User Avatar" />
                  </span>
                  <span className="pr-2">
                    <Dropdown onSelect={(event) => { accountChangedClicked(event) }}>
                      <Dropdown.Toggle id="dropdown-basic">
                        {account?.meta.name}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        {(accounts || []).filter((acc) => acc.address !== account.address).map((acc) =>
                          <Dropdown.Item key={acc.address} eventKey={acc.address}>{acc.meta.name}</Dropdown.Item>
                        )}
                      </Dropdown.Menu>
                    </Dropdown>
                  </span>
                </div>
                <span className={`menu-btn ml-2 `} id="menu-toggle" onClick={() => setToggle(!toggle)}><RiIcons.RiMenu2Line /></span>
              </div>
            </nav>
            <div className='content-container-main' >
              <Switch>
                <Route path='/' exact component={OverviewScreen} />
                <Route path='/leading' exact component={HomeScreen} />
                <Route path='/leasing' exact component={HomeScreen} />
                <Route path='/assets' exact component={PortfolioScreen} />
                <Route path='/defi' exact component={PortfolioScreen} />
                <Route path='/issue_nft' exact component={NFTScreen} />
              </Switch>
            </div>
          </div>
        </Container>
      </Router>
    </>
  )
}

export default App;
