import React, { Component } from "react";

class Items extends Component {
    render() {
        let {
            id,
            description,
            amount,
            date
        } = this.props.itemType;
        return (
            <li className="singleItem" key={id}>
                <p>Description: {description}</p>
                <p>Amount: {amount} </p>
                <p>Date: {date}</p>
            </li>
        );
    }
}

export default Items;