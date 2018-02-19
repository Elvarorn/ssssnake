import React from 'react';
import ReactDOM from 'react-dom';
//import Container from './components/Container/Container';
import { PropTypes } from 'prop-types';
import '../styles/site';
import socketClient from 'socket.io-client';
import Login from './components/Login/Login';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            userName: '',
        }
        const socket = socketClient('http://localhost:8080');
        this._socket = socket;
    };

    componentDidCatch(error, info) {
        console.log(error, info);
    }
    getChildContext() {
        return {
            socket: this._socket
        };
    }

    setUsername(user) {
        this.setState({userName: user});
    }


    render() {
        return (
                <div>
                    <Login/>
                </div>
        );
    }
}


App.childContextTypes = {
    socket: PropTypes.object.isRequired
};


ReactDOM.render(<App />, document.getElementById('app'));
