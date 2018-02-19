import React from 'react';
import { PropTypes} from 'prop-types';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            user: '',
        };
    }
    validateAndConfirm() {
        const{ socket } = this.context;
        socket.emit('adduser', this.state.user, (loggedIn) => {

            if(loggedIn) {
                this.setState({logged:true});
            }
        });

        document.getElementById('login').classList.add('hidden');
        document.getElementById('chat').classList.remove('hidden');
    }

    render() {
        const {user} = this.state;
        return (
            <div>
                <chatserver user = {this.state.value} />
                <input type="text" value = { user} onInput={(e) => this.setState({user: e.target.value})} />
                <button type="button" onClick = {() => this.validateAndConfirm()} >Confirm</button>
            </div>
        );
    }


}
Login.contextTypes = {
    socket: PropTypes.object.isRequired
};

export default Login;
