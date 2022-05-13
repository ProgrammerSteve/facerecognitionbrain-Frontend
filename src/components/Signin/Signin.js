import React from 'react';
import './Signin.css';
import {backendURL} from '../.././url-file.js';

class Signin extends React.Component{
	constructor(props){
		super(props);
		this.state={
			signInEmail:'',
			signInPassword:''
		}
	}

	saveAuthTokenInSession=(token)=>{
		window.sessionStorage.setItem('token', token);
	
	}	

	onEmailChange=(event)=>{
		this.setState({signInEmail:event.target.value})
	}

	onPasswordChange=(event)=>{
		this.setState({signInPassword:event.target.value})
	}

	onSubmitSignIn=()=>{
		fetch(`${backendURL}/signin`,{
			method:'post',
			headers:{'Content-Type':'application/json'},
			body: JSON.stringify(
				{
					email:this.state.signInEmail,
					password:this.state.signInPassword
				}
			)
		})
		.then(response=>response.json())

		// WITHOUT JWT TOKENS
		.then(data=>{
			console.log('data returned by /signin: ', data);
			if(data.id){
				fetch(`${backendURL}/profile/${data.id}`,{
				method: 'get',
				headers: 
					{
					'Content-Type': 'application/json',
					}                
				})
				.then(resp=>resp.json())
				.then(user=>{
				console.log('data from fetch: ', user);
				if(user && user.email){
					this.props.loadUser(user)
					this.props.onRouteChange('home');
				}
				})
				.catch(console.log)
			}
		})	
		.catch(err=>console.log(err))

		// WITH JWT TOKENS
		// .then(data=>{
		// 	if(data.userId && data.success==='true'){
		// 		this.saveAuthTokenInSession(data.token);
		// 		fetch(`${backendURL}/profile/${data.userId}`,{
		// 		method: 'get',
		// 		headers: 
		// 			{
		// 			'Content-Type': 'application/json',
		// 			'Authorization': data.token
		// 			}                
		// 		})
		// 		.then(resp=>resp.json())
		// 		.then(user=>{
		// 		console.log('data from fetch: ', user);
		// 		if(user && user.email){
		// 			this.props.loadUser(user)
		// 			this.props.onRouteChange('home');
		// 		}
		// 		})
		// 		.catch(console.log)
		// 	}
		// })	
		// .catch(err=>console.log(err))

	}






	render(){
		const {onRouteChange}=this.props;
			return(
			<div>
				<article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
					<main className="pa4 black-80">
						<div className="measure">
							<fieldset id="sign_up" className="ba b--transparent ph0 mh0">
								<legend className="f1 fw6 ph0 mh0">Sign In</legend>

								<div className="mt3">
									<label className="db fw6 lh-copy f6" htmlfor="email-address">Email</label>
									<input 
										className="pa2 input-reset ba bg-transparent hover-bg-black hover-black hover-white  w-100" 
										type="email" 
										name="email-address"  
										id="email-address"
										onChange={this.onEmailChange}
										/>
								</div>
								<div className="mv3">
									<label className="db fw6 lh-copy f6" htmlfor="password">Password</label>
									<input 
										className="b pa2 input-reset ba bg-transparent hover-bg-black hover-black hover-white w-100" 
										type="password" 
										name="password"  
										id="password"
										onChange={this.onPasswordChange}
									/>
								</div>
							</fieldset>
							<div className="">
								<input 
									className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
									type="submit" 
									value="Sign in"
									onClick={this.onSubmitSignIn}
								/>
							</div>
							<div className="lh-copy mt3">
								<p 
									className="f6 link dim black db pointer" 
									onClick={()=>{onRouteChange('register')}}
								>Register</p>
							</div>
						</div>
					</main>
				</article>
			</div>
		)
	}
}

export default Signin;