import React from 'react';
import { PropTypes } from 'prop-types';

class PrivateMessage extends React.Component {
    componentDidMount() {
        const { socket } = this.context;
        socket.on('recv_privatemsg', (userName, msg) => {
            let message = this.state.messages;
            message.push(userName + ' - ' + msg);
            this.setState({ messages:message });
        });
    }

    constructor(props) {
        super(props);
        this.state = {
            msg: '',
            messages: [],
            userName: ''
        };
    }

    sendMessage() {
        const { socket } = this.context;
        let msgObj = {
            nick: this.state.userName,
            message: this.state.msg
        }
        this.setState({ msg: '' });
        socket.emit('privatemsg', msgObj, (messageSent, error) => {
            if(messageSent) {
                console.log('Message has been sent');
            }else {
                console.log(error);
            }
        });
    }

    render() {
        const { messages, msg, userName } = this.state;
        return (
            <div className="privateMessageBox">
                {messages.map(m => ( <div key={m}>{m}</div> ))}
                <div className="InputBox">
                    <label htmlFor = "userName" > UserName: </label>
                    <input type="text" id = "userName" value={userName} onInput={(f) => this.setState({ userName: f.target.value })}/>
                    <label htmlFor = "msg" > Message: </label>
                    <input type="text" id = "msg" value={msg} onInput={(e) => this.setState({ msg: e.target.value })} />
                    <button type="button" className="private-button" onClick={() => this.sendMessage()}>Send</button>
                </div>
            </div>
        );
    }
}

PrivateMessage.contextTypes = {
    socket: PropTypes.object.isRequired
};

export default PrivateMessage;
