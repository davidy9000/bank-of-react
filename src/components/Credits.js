import React, { Component } from 'react'
import AccountBalance from './AccountBalance';
import Items from "./Items";
import axios from 'axios';
import { Link } from 'react-router-dom';

class Credits extends Component {
    constructor() {
        super()
        this.state = {
            credits: [],
            description: "",
            amount: 0
        }
    }

    componentDidMount = () => {
        this.fetchCredit();
    }

    //Axios call to get the info and set states
    fetchCredit = () => {
        axios.get(`https://moj-api.herokuapp.com/credits`)
            .then(cred => {
                const credsData = cred.data;
                this.setState({ 
                    credits: credsData
                });
            }, (error) => {
                console.log(error);
            })
    }

    /*
        This handles what happens on submit.
        It iterates through the existing API info for credits and if the keyword matches, it adds a new Debit to the class array with the current data (currently hardcoded). It will then update the state of the debits array and attempts to reset the input. Afterward, it will call the function that its parent App passed in as a prop to change its parent's accountBalance value, which will reflect in all its children, including Debits.
    */
    handleSubmitCredit = (e) => {
      e.preventDefault();

      for(let i = 0; i < this.state.credits.length; i++) {
        if(this.state.credits[i].description === this.state.input) {
            let updateInput = Object.assign({}, this.state.credits[i]); //shallow copy?
            updateInput.date = "2019-01-11"; //hardcode
            this.setState({
              credits: [...this.state.credits, updateInput],
              input: "",
            });
            this.props.OnNewCredit(updateInput.amount);
        }
      }
    }

    //Keep track of user input, could probably be revised to clear input field on submit/button press
    handleChange = (event) => {
        this.setState({
            input: event.target.value
        })
    }

    render() {
        console.log(this.state.credits);
        return (
            <div className="Envelope">
                <div className="Container">
                    <h1 id="credit">Credits</h1>
                    <Link to="/">Home</Link>
                    <AccountBalance accountBalance={this.props.accountBalance}/>

                    <form onSubmit={this.handleSubmitCredit}>
                        <label htmlFor="newCredit">Add New Credit: </label>
                        <input type="text" name="newCredit" onChange={this.handleChange} />
                        <button onClick={this.handleSubmitCredit}>Add Credit</button>
                    </form>

                    <ul>
                        {this.state.credits.map(cred => 
                            <li><b>{cred.description}</b>: ${cred.amount.toFixed(2)} on {cred.date.substring(0, 10)}</li>
                        )}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Credits;