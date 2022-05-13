import React from 'react';
import {
    DropdownMenu, 
    DropdownToggle,
    DropdownItem,
    ButtonDropdown
} from 'reactstrap';

class ProfileIcon extends React.Component{
    constructor(props){
        super(props);
        this.state={
            dropdownOpen: false
        }
    }

    toggle=()=> {
        this.setState(prevState=>({
          dropdownOpen: !prevState.dropdownOpen
        }));
    }

    render(){
        return(
            <div className='pa4 tc'>

                <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle
                        tag="span"
                        // onClick={this.toggle}
                        data-toggle="dropdown"
                        aria-expanded={this.state.dropdownOpen}
                    >
                    <img 
                        src="http://tachyons.io/img/logo.jpg"
                        className="br-100 ba h3 w3 dib" 
                        alt="avatar"
                    />
                    </DropdownToggle>
                    <DropdownMenu 
                        className="b--transparent shadow-5" 
                        style={{
                            marginTop:'20px', 
                            backgroundColor: 'rgba(255,255,255,0.5)'
                        }}
                    >
                        <DropdownItem onClick={this.props.toggleModal}>View Profile</DropdownItem>
                        <DropdownItem onClick={
                            ()=>{this.props.onSignOut();}
                        }>Sign Out</DropdownItem>
                    </DropdownMenu>
                </ButtonDropdown>
                {/* <div className="pa4 tc">
                </div> */}
            </div>
        );
    }
}
export default ProfileIcon;