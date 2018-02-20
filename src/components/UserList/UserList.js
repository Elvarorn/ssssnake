import React from 'react';
import { PropTypes } from 'prop-types';

class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: ''
        }
    }
    kickUser() {
        const { socket } = this.context;
        let kickObj = {
            user : this.state.userName,
            room: this.props.room
        }
        socket.emit('kick', kickObj, (kickUser, error) => {
            if(kickUser) {
                console.log('Player has been kicked');
            }else {
                console.log(error);
            }
        });
        this.setState({ userName: '' });
    }

    banUser() {
        const { socket } = this.context;
        let banObj = {
            user : this.state.userName,
            room: this.props.room
        }
        socket.emit('ban', banObj, (banUser, error) => {
            if(banUser) {
                console.log('Player has been banned');
            }else {
                console.log(error);
            }
        });
        this.setState({ userName: '' });
    }

    render() {
        const { userName } = this.state;
        return(

            <div className ="operatingButtons">
                <input type="text" value={userName} onInput={(e) => this.setState({ userName: e.target.value })} />
                <button type="button" className="kick" onClick={() => this.kickUser()}>Kick User</button>
                <button type="button" className="ban" onClick={() => this.banUser()}>Ban User </button>
            </div>
        )
    }
}

UserList.contextTypes = {
    socket: PropTypes.object.isRequired
};

export default UserList;
