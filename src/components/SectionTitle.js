import React, {Component} from 'react';
import "../styles/SectionTitle.css";


class SectionTitle extends Component {
    render() {
        return (
            <>
                <h2 className="section-title">{this.props.title}</h2>
            </>
        );
    }
}

export default SectionTitle;