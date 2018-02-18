import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/site';

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>I am the Ass</div>
        );
    }
}


ReactDOM.render(<App />, document.getElementById('app'));
