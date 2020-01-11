import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/LogIn';
import Debits from './components/Debits';
import './App.css';

class App extends Component {

  constructor() {
    super();

    this.state = {
      accountBalance: 14568.27,
      currentUser: {
        userName: 'bob_loblaw',
        memberSince: '08/23/99',
      }
    }
  }

  mockLogIn = (logInInfo) => {
    const newUser = {...this.state.currentUser}
    newUser.userName = logInInfo.userName
    this.setState({currentUser: newUser})
  }

  render() {

    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance}/>);
    const UserProfileComponent = () => (
        <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince}  />
    );

    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} {...this.props}/>)
    const DebitsComponent = () => (<Debits accountBalance={this.state.accountBalance} updatingAccountBalanceDebt={this.updatingAccountBalanceDebt} />);

    return (
        <Router>
          <div>
            <div className="App-Header">
              <h1>Bank of React</h1>
            </div>
            <Route exact path="/" render={HomeComponent}/>
            <Route exact path="/login" render={LogInComponent}/>
            <Route exact path="/userProfile" render={UserProfileComponent}/>
            <Route exact path="/Debits" render={DebitsComponent}/>
          </div>
        </Router>
    );
  }

}

export default App;