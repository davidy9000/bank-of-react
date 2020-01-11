import React, {Component} from 'react';

/*
	The AccountBalance class is only responsible for taking in
	props (passed from App) that contains the proper accountBalance value, stored in App as a state. It will then display it properly.
*/
class AccountBalance extends Component {
  render() {

    return (
        <div>
          <b>Balance</b>: ${this.props.accountBalance.toFixed(2)}
        </div>
    );
  }
}

export default AccountBalance;