import React from 'react';

// function Rank({name,entries}) {
//   return (
//   	<div> 	
// 	    <div className="white f3">
// 	    	{`Hello ${name}, your current rank is...`}
// 	    </div>
// 		<div className="white f1">
// 			{`${entries}`}
// 		</div>
//     </div>
//   );
// }

class Rank extends React.Component{
	constructor(props){
		super(props);
		this.state={
			emoji:''
		}
	}
	generateEmoji=(entries)=>{
		fetch(`https://ez3dkg3ie5s6px2vmz5c6drm3e0syros.lambda-url.us-east-1.on.aws/rank?rank=${entries}`)
		.then(resp=>resp.json())
		.then(data=>this.setState(prevState=>({...prevState,emoji: data.input})))
		.catch(err=>console.log('err: ',err))
		return
	}	

	componentDidMount(){
		this.generateEmoji(this.props.entries);
	}

	componentDidUpdate(prevProps, prevState){
		if(prevProps.entries=== this.props.entries && prevProps.name === this.props.name){
			return null
		}
		this.generateEmoji(this.props.entries);
	}
	
	render(){
		const {name,entries}=this.props;
		return (
			<div>
			
			  <div className="white f3">
				  {`Hello ${name}, your current rank is...`}
			  </div>
	  
			  <div className="white f1">
				  {`${entries}`}
			  </div>

			  <div className="white f3">
				  {`Rank Badge: ${this.state.emoji}`}
			  </div>			  
	  
		  </div>
		);
	}
}
export default Rank;