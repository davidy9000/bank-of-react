import React, {Component} from 'react';
import AccountBalance from './AccountBalance';
import {Link} from 'react-router-dom';
import './Home.css';

class Home extends Component {
  render() {
    return (
        <div className="Container">

          <div><Link to="/userProfile">User Profile</Link></div>
          <div><Link to="/LogIn">Log In</Link></div>

          <AccountBalance accountBalance={this.props.accountBalance}/>
        </div>
    );
  }
}

export default Home;