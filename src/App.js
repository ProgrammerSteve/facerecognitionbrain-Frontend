import './App.css';
import React,{Component} from 'react';
import Particles from "react-tsparticles";
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Rank from './components/Rank/Rank.js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
//import Clarifai from 'clarifai';
import Signin from './components/Signin/Signin.js';
import Register from './components/Register/Register.js';


// import {ClarifaiStub, grpc} from "clarifai-nodejs-grpc";


//API KEY
//570d4ef66c7f47819b55ea6a261c5174
// const app = new Clarifai.App({
//   apiKey : '570d4ef66c7f47819b55ea6a261c5174'
// });


//Clarifai Model Numbers
// CELEBRITY_MODEL: "e466caa0619f444ab97497640cefc4dc"
// CLUSTER_MODEL: "cccbe437d6e54e2bb911c6aa292fb072"
// COLOR_MODEL: "eeed0b6733a644cea07cf4c60f87ebb7"
// DEMOGRAPHICS_MODEL: "c0c0ac362b03416da06ab3fa36fb58e3"
// FACE_DETECT_MODEL: "a403429f2ddf4b49b307e318f00e528b"
// FACE_EMBED_MODEL: "d02b4508df58432fbb84e800597b8959"
// FOCUS_MODEL: "c2cf7cecd8a6427da375b9f35fcd2381"
// FOOD_MODEL: "bd367be194cf45149e75f01d59f77ba7"
// GENERAL_EMBED_MODEL: "bbb5f41425b8468d9b7a554ff10f8581"
// GENERAL_MODEL: "aaa03c23b3724a16a56b629203edc62c"
// LANDSCAPE_QUALITY: "bec14810deb94c40a05f1f0eb3c91403"
// LOGO_MODEL: "c443119bf2ed4da98487520d01a0b1e3"
// MODERATION_MODEL: "d16f390eb32cad478c7ae150069bd2c6"
// NSFW_MODEL: "e9576d86d2004ed1a38ba0cf39ecb4b1"
// PORTRAIT_QUALITY: "de9bd05cfdbf4534af151beb2a5d0953"
// TEXTURES_AND_PATTERNS: "fbefb47f9fdb410e8ce14f24f54b47ff"
// TRAVEL_MODEL: "eee28c313d69466f836ab83287a54ed9"
// WEDDINGS_MODEL: "c386b7a870114f4a87477c0824499348"
// WEDDING_MODEL: "c386b7a870114f4a87477c0824499348"










const particlesInit = (main) => {
	//console.log(main);
	// you can initialize the tsParticles instance (main) here, adding custom shapes or presets
};

const particlesLoaded = (container) => {
	//console.log(container);
};

const particlesOption={
    background: {
      color: {
        value: "#3297a8",
      },
    },



    fpsLimit: 60,
    interactivity: {


      events: {
        onClick: {
          enable: true,
          mode: "push",
        },


        onHover: {
          enable: true,
          mode: "repulse",
        },
        resize: true,
      },


      modes: {
        bubble: {
          distance: 400,
          duration: 2,
          opacity: 0.8,
          size: 40,
        },



        push: {
          quantity: 4,
        },


        repulse: {
          distance: 200,
          duration: 0.4,
        },
      },
    },



    particles: {


      color: {
        value: "#ffffff",
      },


      links: {
        color: "#ffffff",
        distance: 150,
        enable: true,
        opacity: 0.5,
        width: 1,
      },


      collisions: {
        enable: true,
      },


      move: {
        direction: "none",
        enable: true,
        outMode: "bounce",
        random: false,
        speed: 6,
        straight: false,
      },



      number: {
        density: {
          enable: true,
          value_area: 800,
        },
        value: 80,
      },


      opacity: {
        value: 0.5,
      },


      shape: {
        type: "circle",
      },


      size: {
        random: true,
        value: 5,
      },
    },
    detectRetina: true,
};


// //Creating a stub and metadate for authentication of API key
// const stub = ClarifaiStub.grpc();
// const metadata = new grpc.Metadata();
// metadata.set("authorization", "570d4ef66c7f47819b55ea6a261c5174");



const initialState={
  input:'',
  imageUrl:'',
  box:{},
  route:'signin',
  isSignedIn: false,
  user:{
    id:'',
    name:'',
    email:'',
    entries:0,
    joined: ''
  }
}

class App extends Component {

  constructor(){
    super();
    this.state={
      input:'',
      imageUrl:'',
      box:{},
      route:'signin',
      isSignedIn: false,
      user:{
        id:'',
        name:'',
        email:'',
        entries:0,
        joined: ''
      }
    }
  }

  // componentDidMount() {
  //   fetch('http://localhost:3000/')
  //     .then(response => response.json())
  //     .then(console.log)
  //     .catch(err=>console.log(err))
  // }


  loadUser=(data)=>{
    this.setState({user:{
        id:data.id,
        name:data.name,
        email:data.email,
        entries:data.entries,
        joined: data.joined
    }})
  }



  calculateFaceLocation=(data)=>{
    console.log('enter calculateFaceLocation function');
    //bounding box is a percentage of the image
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    console.log('API bounding box: ',clarifaiFace)
    const image = document.getElementById('inputimage');
    const width=Number(image.width);
    const height=Number(image.height);
    console.log(width,height)

    return{
      'leftCol': clarifaiFace.left_col * width,
      'topRow': clarifaiFace.top_row*height,
      'rightCol': width-(clarifaiFace.right_col *width),
      'bottomRow': height-(clarifaiFace.bottom_row *height),
    }
  }

  displayFaceBox =(box)=>{
    console.log('enter displayFaceBox function')
    console.log(box);
    this.setState({box:box});
  }

  onInputChange=(event)=>{
    this.setState({input:event.target.value});
    //console.log(event.target.value);
  }










  // onButtonSubmit=()=>{
  //   this.setState({imageUrl: this.state.input});
  //   console.log('click');


  //   //let modelNum=Clarifai.COLOR_MODEL;
  //   let modelNum=Clarifai.FACE_DETECT_MODEL;
  //   let URLstring="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Tom_Hanks_TIFF_2019.jpg/330px-Tom_Hanks_TIFF_2019.jpg";

  //   app.models.predict(modelNum,this.state.input).then(
  //     response=>this.displayFaceBox(this.calculateFaceLocation(response))).catch(err=> console.log(err));
  // }










  onButtonSubmit=()=>{
    this.setState({imageUrl: this.state.input});
      fetch('https://aqueous-harbor-22133.herokuapp.com/imageurl',{
        method:'post',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response=>response.json())
      .then(response=>{
        if(response){
          fetch('https://aqueous-harbor-22133.herokuapp.com/image',{
            method:'put',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({
              id:this.state.user.id
            })
          })
          .then(response=>response.json())
          .then(count=>{
            this.setState(Object.assign(this.state.user,{entries:count}))
          })
          .catch(console.log)
        }
        this.displayFaceBox(this.calculateFaceLocation(response));
      }
    )
  }



  // onButtonSubmit=()=>{
  //   this.setState({imageUrl: this.state.input});
  //   app.models.predict(Clarifai.FACE_DETECT_MODEL,this.state.input)
  //     .then(response=>{
  //       if(response){
  //         fetch('http://localhost:3000/image',{
  //           method:'put',
  //           headers:{'Content-Type':'application/json'},
  //           body: JSON.stringify({
  //             id:this.state.user.id
  //           })
  //         })
  //         .then(response=>response.json())
  //         .then(count=>{
  //           this.setState(Object.assign(this.state.user,{entries:count}))
  //         })
  //         .catch(console.log)
  //       }
  //       this.displayFaceBox(this.calculateFaceLocation(response));
  //     }
  //   )
  // }














  onRouteChange=(route)=>{
    if(route==='signout'){
      //this.setState({isSignedIn:false});
      this.setState(initialState);
    }else if (route==='home'){
      this.setState({isSignedIn:true});
    }
    this.setState({route:route});
  }



  render(){
    return (
      <div className="App">

        <Particles
          id="tsparticles"
          className='particles'
          init={particlesInit}
          loaded={particlesLoaded}
          options={particlesOption}
        />

        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>


        {this.state.route==='home'
          ? <div>
          <Logo/>
          <Rank name={this.state.user.name} entries={this.state.user.entries}/>
          <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
          <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
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
