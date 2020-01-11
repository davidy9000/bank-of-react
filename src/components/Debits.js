import React, { Component } from 'react'
import AccountBalance from './AccountBalance';
import Items from "./Items";
import axios from 'axios';
import { Link } from 'react-router-dom';

class Debits extends Component {
    constructor() {
        super()
        this.state = {
            debits: [],
            description: "",
            amount: 0
        }
    }

    componentDidMount = () => {
        this.fetchDebit();
    }

    fetchDebit = () => {

    }

    render() {
        return (
            <div>
                <h1>Debits</h1>
                <Link to="/">Home</Link>
                <AccountBalance accountBalance={this.props.accountBalance}/>
            </div>
        );
    }
}

export default Debits;