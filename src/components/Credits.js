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

    fetchCredit = () => {

    }

    render() {
        return (
            <div>
                <h1>Credits</h1>
                <Link to="/">Home</Link>
                <AccountBalance accountBalance={this.props.accountBalance}/>
            </div>
        );
    }
}

export default Credits;