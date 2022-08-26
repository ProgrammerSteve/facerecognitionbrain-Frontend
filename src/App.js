import './App.css';
import React,{Component} from 'react';
import Particles from "react-tsparticles";
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Rank from './components/Rank/Rank.js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
import Signin from './components/Signin/Signin.js';
import Register from './components/Register/Register.js';
import Modal from './components/Modal/Modal';
import Profile from './components/Profile/Profile';
import {particlesOption} from './bgsettings.js'
import {backendURL} from './url-file.js';

const initialState={
  input:'',
  imageUrl:'',
  boxes:[],
  route:'signin',
  isSignedIn: true,
  isProfileOpen: false,
  user:{
    id:'',
    name:'',
    email:'',
    entries:0,
    joined: '',
    pet:'',
    age:'',
  }
}

class App extends Component {
  constructor(){
    super();
    this.state={...initialState};
  }

  loadUser=(data)=>{
    this.setState(prevState=>({
        ...prevState,
        user:
          {
            id:data.id,
            name:data.name,
            email:data.email,
            entries:data.entries,
            joined: data.joined
          }
    }))
  }

  calculateFaceLocations=(data)=>{
    //bounding box is a percentage of the image
    if(data&& data.outputs){
      return data.outputs[0].data.regions.map(face=>{
        const clarifaiFace=face.region_info.bounding_box;
        const image = document.getElementById('inputimage');
        const width=Number(image.width);
        const height=Number(image.height);
        return{
          'leftCol': clarifaiFace.left_col * width,
          'topRow': clarifaiFace.top_row*height,
          'rightCol': width-(clarifaiFace.right_col *width),
          'bottomRow': height-(clarifaiFace.bottom_row *height),
        }
      });  
    }
    return;
  }

  displayFaceBoxes =(boxes)=>{
    if(boxes){
      this.setState({boxes:boxes});
    }
  }

  onInputChange=(event)=>{
    this.setState({input:event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
      fetch(`${backendURL}/imageurl`, {
        method: 'post',
        headers: 
        {
          'Content-Type': 'application/json',
          // 'Authorization': window.sessionStorage.getItem('token')
        },
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch(`${backendURL}/image`, {
            method: 'put',
            headers: 
            {
              'Content-Type': 'application/json',
              // 'Authorization': window.sessionStorage.getItem('token')
            },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })
            .catch(console.log)
        }
        this.displayFaceBoxes(this.calculateFaceLocations(response))
      })
      .catch(err => console.log(err));
  }

  onRouteChange=(route)=>{
    if(route==='signout'){
      //this.setState({isSignedIn:false});
      this.setState(prevState=>({...prevState,initialState}));
    }else if (route==='home'){
      this.setState(prevState=>({...prevState,isSignedIn:true}));
    }
    this.setState(prevState=>({...prevState,route:route}));
  }

  toggleModal=()=>{
    this.setState(prevState=>({
      ...prevState,
      isProfileOpen: !prevState.isProfileOpen
    })
    )
  }

  componentDidMount(){
    // const token=window.sessionStorage.getItem('token');
    console.log('in componentDidMount...');
    //if(token){
    if(true){
          fetch(`${backendURL}/signin`,
            {
              method: 'post',
              headers: 
                {
                  'Content-Type': 'application/json',
                  // 'Authorization': token
                }
            }
          )
          .then(resp=>resp.json())
          .then(data=>{
            console.log('This is the data: ', data);
            if(data && data.id){
              fetch(`${backendURL}/profile/${data.id}`,{
                method: 'get',
                headers: 
                  {
                    'Content-Type': 'application/json',
                    // 'Authorization': token
                  }                
              })
              .then(resp=>resp.json())
              .then(user=>{
                console.log('data from fetch: ', user);
                if(user && user.email){
                  this.loadUser(user)
                  this.onRouteChange('home');
                }
              })
            }
          })
          .catch(console.log)
    }
  }

  onSignOut=()=>{
    this.setState(
      prevState=>(
        {
          ...prevState,
          input:'',
          imageUrl:'',
          boxes:[],
          route:'signin',
          isSignedIn: true,
          isProfileOpen: false,
          user:{
            id:'',
            name:'',
            email:'',
            entries:0,
            joined: '',
            pet:'',
            age:'',
          }
        }
      )
    )
  }

  render(){
    console.log('In render...');
    return (
      <div className="App">

        {/* <Particles
          id="tsparticles"
          className='particles'
          options={particlesOption, particlesInit, particlesLoaded}
        /> */}

        <Navigation 
          isSignedIn={this.state.isSignedIn} 
          onRouteChange={this.onRouteChange}
          toggleModal={this.toggleModal}
          onSignOut={this.onSignOut}
        />
        {this.state.isProfileOpen && 
          <Modal>
            {'hello'}
            <Profile 
              isProfileOpen={this.state.isProfileOpen} 
              toggleModal={this.toggleModal}
              loadUser={this.loadUser}
              user={this.state.user}
            />
          </Modal>
        }
        {this.state.route==='home'
          ? <div>
          <Logo/>
          <Rank 
            name={this.state.user.name} 
            entries={this.state.user.entries}
          />
          <ImageLinkForm 
            onInputChange={this.onInputChange} 
            onButtonSubmit={this.onButtonSubmit}
          />
          <FaceRecognition 
            boxes={this.state.boxes} 
            imageUrl={this.state.imageUrl}
          />
          </div>
          :(
            this.state.route==='signin'
            ?<Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            :<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            )
        }
      </div>
    );
  }
}

export default App;