import React from 'react';
import { PropTypes} from 'prop-types';

class Navbar extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            newRoom: '',
            currentRoom: props.getCurrRoom,
            rooms: props.getRooms
        }
    }


    backToChat() {
        this.setState({currentRoom: this.state.newRoom})
        this.props.getNewRoom(this.state.newRoom);
    }
    render() {
        const {newRoom} = this.state;
        console.log(newRoom);
        return(
            <div>
                <p>current room: { this.state.currentRoom } </p>

                <p> join or create room </p>
                <input type="text"  onInput={(e) => this.setState({newRoom: e.target.value})}/>
                <button type="button" onClick = {() => this.backToChat()} >Confirm</button>

                <div>
                    <p>Rooms:</p>
                    <ul>
                        {this.state.rooms.map((room, i) =>(

                            <li key={i}> {this.state.rooms} </li>  ))}
                    </ul>
                </div>
            </div>
        );
    }
}

Navbar.contextTypes = {
    socket: PropTypes.object.isRequired
};
export default Navbar;
