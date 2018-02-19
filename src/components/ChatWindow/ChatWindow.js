import React from 'react';
import { PropTypes } from 'prop-types';


class ChatWindow extends React.Component {
    componentDidMount() {
        const {socket} = this.context;
        socket.on('sendmsg', (msg) => {
            let messages = Object.assign({}, this.state.messages);
            messages.push(`${(new Date()).toLocateTimeString()} - $(msg)`);
            this.setState({ messages});
        });
    }
    constructor(props) {
        super(props);
        this.state = {
            msg: '',
            messages: []
        };
    }
    sendMessage() {
        const {socket} = this.context;
        socket.emit('sendmsg', this.state.msg);
        console.log(this.state.msg);
        this.setState({msg: ''});
    }
    render() {
        const { messages, msg} = this.state;
        return (
            <div className="chat-window">
                {messages.map(m => ( <div key={m}>{m}</div> ))}
                <div className="input-box">
                    <input
                        type="text"
                        value={msg}
                        className="input input-big"
                        onInput={(e) => this.setState({msg: e.target.value})} />
                    <button type="button" className="btn" onClick={() => this.sendMessage()}>Send</button>
                </div>
            </div>
        );
    }
};

ChatWindow.contextTypes = {
    socket: PropTypes.object.isRequired

};

export default ChatWindow;
