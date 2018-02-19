import React from 'react';
import ChatWindow from '../ChatWindow/ChatWindow';
import { PropTypes} from 'prop-types';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            user: '',
            clicked: false
        };
    }
    validateAndConfirm() {
        const{ socket } = this.context;
        socket.emit('addUser', this.state.user, () => {

            socket.emit('joinroom', {room:'lobby'},(reason) => {
              console.log(reason);
            });
        });
        this.setState({clicked:true});
    }

    render() {
        const {user} = this.state;
        if(!this.state.clicked)
        {
        return(
            <div>
                <input type="text" value = { user} onInput={(e) => this.setState({user: e.target.user})} />
                <button type="button" onClick = {() => this.validateAndConfirm()} >Confirm</button>
            </div>
        );
      }
      else {
        return(
          <div className = 'container'>
              <ChatWindow user = {this.state.user} />
          </div>
        )
      }
    }


}
Login.contextTypes = {
    socket: PropTypes.object.isRequired
};

export default Login;
