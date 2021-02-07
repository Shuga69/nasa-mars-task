import React, {Component} from 'react';
import {Link} from "react-scroll";
import "../styles/LinkButton.css";


class LinkButton extends Component {
    render() {
        return (
            <Link to={this.props.link} onClick={this.props.onClick} spy={true} smooth={true} className="btn-link">{this.props.text}</Link>
        );
    }
}

export default LinkButton;