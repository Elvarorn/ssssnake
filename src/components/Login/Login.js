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


    /*
    socket.emit('adduser', nickname, function(available) {
                if(available) {
                    this.setState({nickname});
                } else {
                    this.setState({error:'Notavailable'});
                    alert('Nickname is not available');
                }
            }.bind(this));

    */
    validateAndConfirm() {
        const{ socket } = this.context;
        console.log(this.state.user, 'this is the user');
        var name = this.state.user;
        socket.emit('addUser', name, (available) => {

        if(available)
        {
          console.log('username available');
        }
        else {
        console.log('username taken');
        }
        console.log('guy ADDED!')
      });

        socket.emit('joinroom', {room:'lobby'},(accepted,reason) => {
              if(accepted)
              {
                console.log('room joined');
              }
              else {
                console.log(reason);
              }
            });
        this.setState({clicked:true});
    }

    render() {
        const {user} = this.state;
        if(!this.state.clicked)
        {
        return(
            <div>
                <input type="text"  value = { user} onInput={(e) => this.setState({user: e.target.value})}/>
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
