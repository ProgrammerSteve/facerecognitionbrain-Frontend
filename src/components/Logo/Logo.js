import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import brain from './brain_logo.png';
//https://stackoverflow.com/questions/70166422/i-cant-install-npm-install-save-react-tilt

const Logo=()=>{
	return(
		<div className='ma4 mt0'>
			<Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
				<div className="Tilt-inner pa3"> <img style={{paddingTop:'5px'}} src={brain} alt="Logo" height="100px" width="100px"/> </div>
			</Tilt>
		</div>
		);
}

export default Logo;