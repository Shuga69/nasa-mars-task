import React, {Component} from 'react';
import "../styles/SectionSubtitle.css";


class SectionSubtitle extends Component {
    render() {
        return (
            <>
                <h3 className="subtitle-in-section">{this.props.title}</h3>
            </>
        );
    }
}

export default SectionSubtitle;