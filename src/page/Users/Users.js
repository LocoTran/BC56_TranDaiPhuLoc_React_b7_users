import React, { Component } from "react";
import Form from "./Form";
import List from "./List";

export default class Users extends Component {
    render() {
        return (
            <div>
                <Form />
                <List />
            </div>
        );
    }
}
