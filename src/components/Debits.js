import React, { Component } from 'react'
import AccountBalance from './AccountBalance';
import Items from "./Items";
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Home.css';

/*
    The Debits class as it is displays the Debits page and handles adding and displaying the list of debits. The user can type in any pre-existing stored value, displayed on the list, and that value will be added to the display with the current date. It currently does not take in custom new debits, but only debits stored in the API already.
*/
class Debits extends Component {
    constructor(props) {
        super(props);
        this.state = {
            debits: [], //to display a list of
            debsData: [],
            input: ""
        }
    }

    //Call to the API
    componentDidMount = () => {
        this.fetchDebit();
    }

    //Axios call to get the info and set states
    fetchDebit = () => {
        axios.get(`https://moj-api.herokuapp.com/debits`)
            .then(deb => {
                const debsData = deb.data;
                this.setState({ 
                    debits: debsData
                });
            }, (error) => {
                console.log(error);
            })
    }

    /*
        This handles what happens on submit.
        It iterates through the existing API info for debits and if the keyword matches, it adds a new Debit to the class array with the current data (currently hardcoded). It will then update the state of the debits array and attempts to reset the input. Afterward, it will call the function that its parent App passed in as a prop to change its parent's accountBalance value, which will reflect in all its children, including Debits.
    */
    handleSubmitDebit = (e) => {
      e.preventDefault();

      for(let i = 0; i < this.state.debits.length; i++) {
        if(this.state.debits[i].description === this.state.input) {
            let updateInput = Object.assign({}, this.state.debits[i]); //shallow copy?
            updateInput.date = "2019-01-11"; //hardcode
            this.setState({
              debits: [...this.state.debits, updateInput],
              input: "",
            });
            this.props.OnNewDebit(updateInput.amount);
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
        // console.log(this.state.debits);
        return (
            <div className="Envelope">
                <div className="Container">
                    <h1 id="debit">Debits</h1>
                    <Link to="/">Home</Link>
                    <AccountBalance accountBalance={this.props.accountBalance}/>

                    <form onSubmit={this.handleSubmitDebit}>
                        <label htmlFor="newDebit">Add New Debit: </label>
                        <input type="text" name="newDebit" onChange={this.handleChange} />
                        <button onClick={this.handleSubmitDebit}>Add Debit</button>
                    </form>

                    <ul>
                        { this.state.debits.map(deb => 
                            <li><b>{deb.description}</b>: ${deb.amount.toFixed(2)} on {deb.date.substring(0, 10)}</li>
                        )}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Debits;


















