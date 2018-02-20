import React from 'react';
import ChatWindow from '../ChatWindow/ChatWindow';
import { PropTypes} from 'prop-types';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            user: '',
            users: [],
            clicked: false,
        };
        this.validateAndConfirm = this.validateAndConfirm.bind(this);
    }

    validateAndConfirm() {
        const{ socket } = this.context;
        var name = this.state.user;
        socket.emit('adduser', name, (available) => {

            if(available) {
              this.state.users.push(name);
                socket.emit('joinroom', {room:'lobby'},(accepted, reason) => {
                    if(accepted) {
                        console.log('room joined');
                    } else {
                        alert(reason);
                    }
                });

                  this.setState({clicked:true});
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
                <div>
                    <div>
                        <ChatWindow getUser = {this.state.user} getRoomName = {'lobby'} />
                    </div>
                </div>
            );
        }
    }


}
Login.contextTypes = {
    socket: PropTypes.object.isRequired
};

export default Login;
