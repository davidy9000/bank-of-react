import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/LogIn';
import Debits from './components/Debits';
import Credits from './components/Credits';
import './App.css';


/*
  * App contains all the important state values, 
  * which it passes down to the other components as props.
  * The other components will use those props to display
  * the proper updated information. 
*/
class App extends Component {

  constructor() {
    super();

    this.state = {
      //Default Values, hardcoded, not calculated
      credits: 24568.27,
      debits: 550.12,
      accountBalance: 24018.5,
      currentUser: { //mock
        userName: 'bob_loblaw',
        memberSince: '08/23/99',
      }
    }
  }

  mockLogIn = (logInInfo) => {
    const newUser = {...this.state.currentUser}
    newUser.userName = logInInfo.userName
    this.setState({currentUser: newUser})
  };


  /*
    * This is a method passed as a prop, currently to the Debits
    * Component. Everytime the Debits Component submits a new
    * Debit, it will call this function with the new debits value
    * as the parameter. Then, App will take that new value and 
    * update its own debit value and accountBalance, the results of 
    * which currently reflect in the Debits page and should also
    * easily enough reflect in the Credits page. 
  */
  handleBalance = (newValue) => {
    console.log("new passed value is", newValue);
    this.setState({
      debits: newValue,
      accountBalance: this.state.accountBalance - this.state.debits
    });
  };

  render() {
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance}/>);
    const UserProfileComponent = () => (
        <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince}  />
    );

    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} {...this.props}/>)
    const DebitsComponent = () => (<Debits accountBalance={this.state.accountBalance} OnNewDebit={this.handleBalance} />);
    const CreditsComponent = () => (<Credits accountBalance={this.state.accountBalance} OnNewCredit={this.handleBalance} />);

    //The display:
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
            <Route exact path="/Credits" render={CreditsComponent}/>
          </div>
        </Router>
    );
  }

}

export default App;