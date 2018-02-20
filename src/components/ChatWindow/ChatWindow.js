import React from 'react';
import Navbar from '../Navbar/Navbar';
import PrivateMessage from '../PrivateMessage/PrivateMessage';
import { PropTypes } from 'prop-types';


export default class ChatWindow extends React.Component {
    componentDidMount() {
        const {socket} = this.context;
        socket.on('updatechat', (roomName, msg)=> {
          this.setState({currRoom:roomName})
          this.setState({messages: msg});
          socket.emit('users');
          socket.emit('rooms');
        });
    }
    constructor(props) {
        super(props);
        this.state = {
            msg: '',
            messages: [],
            currRoom: props.getRoomName,
            roomList: [],
            userName: props.getUser
          };
    }
    sendMessage() {
        const { socket } = this.context;
        let messageObject = {
            msg: this.state.msg,
            roomName: this.state.currRoom
        }
        socket.emit('sendmsg', messageObject);
          console.log(messageObject.msg);
        this.setState({ msg: '' });
    }
    render() {
        const { messages, msg} = this.state;
        return (
          <div>
          <div className='navBarbro'>
          <Navbar  getUser = {this.state.user} getCurrRoom = {this.state.currRoom} />
          </div>
          <div className='container'>
            <div className="chat-window">
                {messages.map((m,i) => ( <div key={i}>{m.timestamp + ' ' + m.nick + ': ' + m.message}</div> ))}
                <div className="input-box">
                    <input
                        type="text"
                        value={msg}
                        className="input input-big"
                        onInput={(e) => this.setState({msg: e.target.value})} />
                    <button type="button" className="btn" onClick={() => this.sendMessage()}>Send</button>
                    <PrivateMessage/>
                </div>

            </div>
            </div>

          </div>

        );
    }
};

ChatWindow.contextTypes = {
    socket: PropTypes.object.isRequired

};

//export default ChatWindow;
