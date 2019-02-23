import React from 'react';
import '../index.css';

export class AboutViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            compName: "About"
        }
    }

    render() {
        return (<div className="mainWrapper">
            <div className="about jumbotron">
                <h1 className="display-4">Awesome Task Manager</h1>
                <p className="lead">By Gabriel C. Ullmann</p>
                <hr className="my-4"></hr>
                <a href="https://github.com/nkinesis" target="_blank" rel="noopener noreferrer">https://github.com/nkinesis</a>
            </div>
        </div>);
    }

}

export default AboutViewer;