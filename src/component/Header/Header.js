import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class Header extends Component {
    render() {
        return (
            <div className="px-2 py-3 border">
                <NavLink to="/" className="btn btn-success mr-2">
                    Home Page
                </NavLink>
                <NavLink to="/users" className="btn btn-success">
                    Manage Users
                </NavLink>
            </div>
        );
    }
}
