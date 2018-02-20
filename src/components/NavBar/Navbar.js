import React from 'react';
import { PropTypes} from 'prop-types';

class Navbar extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
          rooms: [],
          currRoom: props.getCurrRoom,
          username: props.getUser,
          newRoom: ''
        }
        this.validateAndConfirm = this.validateAndConfirm.bind(this);
    }

      validateAndConfirm() {

            const{ socket } = this.context;
        socket.emit('partroom', this.state.currRoom);


        socket.emit('joinroom', this.state.newRoom ,(accepted,reason) => {
            if(accepted) {
                console.log('room joined');
            } else {
                console.log(reason, 'brooo');
            }
            console.log(this.state.newRoom, 'the new room');
            console.log(this.state.currRoom, ' before');
            this.setState({currRoom: this.state.newRoom});
            console.log(this.state.currRoom, ' after')
            this.setState({newRoom:''});
        });




      }

    render() {
        const {currRoom, username , rooms, newRoom} = this.state;
        console.log(currRoom, username, rooms , newRoom);

        return(
          <div>
          <p>current room: </p>
          { this.state.currRoom }
              <p> new room </p>
              <input type="text"  onInput={(e) => this.setState({newRoom: e.target.value})}/>
              <button type="button" onClick = {() => this.validateAndConfirm()} >Confirm</button>

          </div>
        );
    }
}

Navbar.contextTypes = {
    socket: PropTypes.object.isRequired
};
    export default Navbar;
