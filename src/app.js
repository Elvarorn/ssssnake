import React from 'react';
import ReactDOM from 'react-dom';
import Container from './components/Container/Container';
import '../styles/site';

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Container>
                <h2> i am the title</h2>
            </Container>
        );
    }
}


ReactDOM.render(<App />, document.getElementById('app'));
