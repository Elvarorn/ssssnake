import React from 'react';
import ChatWindow from '../ChatWindow/ChatWindow';
import { PropTypes} from 'prop-types';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            user: '',
            clicked: false,
            error: ' '
        };
        this.validateAndConfirm = this.validateAndConfirm.bind(this);
    }


    validateAndConfirm() {
        const{ socket } = this.context;
        console.log(this.state.user, 'this is the user');
        var name = this.state.user;
        socket.emit('adduser', name, (available) => {

            if(available) {
                console.log('username available');
                socket.emit('joinroom', {room:'lobby'},(accepted) => {
                if(accepted) {
                    console.log('room joined');
                } else {
                    alert('Username Taken!');
                }
                  this.setState({clicked:true});
            });
            } else {
              alert('username taken!');
            }
            console.log('guy ADDED!')

        });
    }

    render() {
        const {user} = this.state;
        if(!this.state.clicked) {
            return(
                <div>
                    <input type="text"  value = { user} onInput={(e) => this.setState({user: e.target.value})}/>
                    <button type="button" onClick = {() => this.validateAndConfirm()} >Confirm</button>
                </div>
            );
        } else {
            return(
                <div className = 'container'>

                    <ChatWindow getUser = {this.state.user} getRoomName = {'lobby'} />
                </div>
            );
        }
    }


}
Login.contextTypes = {
    socket: PropTypes.object.isRequired
};

export default Login;
