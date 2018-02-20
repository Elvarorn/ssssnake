import React from 'react';
import Navbar from '../Navbar/Navbar';
import PrivateMessage from '../PrivateMessage/PrivateMessage';
import { PropTypes } from 'prop-types';


export default class ChatWindow extends React.Component {
    componentDidMount() {
        const {socket} = this.context;

        socket.on('roomlist', rooms => this.setState( { roomList: Object.keys(rooms).map(key => { return { name: key, ...rooms[key] } } ) }));

        socket.on('updatechat', (roomName, msg)=> {

          this.setState({currRoom:roomName})
          this.setState({messages: msg});
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
        this.setState({ msg: '' });
    }

    changeRoom(newRoom) {
        const { socket } = this.context;
        let roomObj = {
          room: newRoom,
          pass: ''
        }
        socket.emit('joinroom', roomObj,(accepted,reason) => {
                  if(accepted) {
                    console.log(newRoom, 'joined this room');
                      socket.emit('partroom', this.state.currRoom);
                      socket.on('updateusers', (userchannel, user) => {
                          console.log(user);
                      });
                      console.log(this.state.currRoom, ' left this room');
                      this.setState({currRoom: newRoom});

                      alert(newRoom + ' room joined');
                  } else {
                      console.log(reason, '<- this is the damn reason');
                  }
              });

              console.log('this is the shit: ', this.state.roomList);
    };

    render() {
        const { messages, msg} = this.state;
        return (
          <div>
          <div className='navBarbro'>
          <Navbar  getNewRoom={this.changeRoom.bind(this)} getRooms= {this.state.roomList} getCurrRoom = {this.state.currRoom} />
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
