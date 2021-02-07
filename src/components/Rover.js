import React, { Component } from 'react';
import '../styles/Rover.css'
import "antd/dist/antd.css";
import axios from 'axios';
import SectionTitle from './SectionTitle'
import SectionSubtitle from './SectionSubtitle'
import LinkButton from './LinkButton'


import { Slider, InputNumber } from "antd";


class Rover extends Component {
    state = {
        min: 0,
        max: 3026
      };
    

      
  constructor(props){
    super(props);
   
    this.state = {
      roverChosen: "curiosity",
      apiKey:"HCfCto5QzxPxLLg6pJNf2b6dUvBYg8y2VXLnyZrI",
      cameraChosen: "",
      solChosen: "",
      responsePhotos: [],
      error: "",
      loading: "",
      visible: 2,
      
      initialRequestMade: false
    };
    this.loadMore = this.loadMore.bind(this);
  }
  loadMore() {
    this.setState((prev) => {
      return {visible: prev.visible + 4};
    });
  }
  
  // when user selects a rover, update state
  handleRoverSelection = (event) => {
    this.setState({
      roverChosen: event.target.value,
      cameraChosen: ""
    });
  }

  // when user selects a camera, update state
  handleCameraSelection = (event) => {
    this.setState({ cameraChosen: event.target.value });
  }
  handleSolSelection = (value) => {
    this.setState({ solChosen: value });
    this.setState({max: value });
    
  }

  // when user hits "Get photos"
  handleSubmit = (event) => {
    this.setState({
        visible : 2,
    });
    // when user clicks submit, check if photo url is empty
    // if so, set state of loading
    
    this.setState({
      loading: "Loading...",
    });


    let baseUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${this.state.roverChosen}/photos?sol=${this.state.solChosen}&camera=${this.state.cameraChosen}&api_key=${this.state.apiKey}`;

    axios.get(baseUrl)
    .then((res) => {
      if (res.data.Error) { // if error
        this.setState({
          error: res.errors
        });
      } else { // if success
        
        // check if any photos come back
        if (res.data.photos) {
          this.setState({
            responsePhotos: res.data.photos
          });
        } else {
            this.setState({
                responsePhotos: null
              });
        }

        // regardless of if photos come back:
        this.setState({
          loading: "",
          initialRequestMade: true
        });
      }
    });
  }

  renderPhotoOrNotFoundMessage() {
    
    if (!this.state.responsePhotos.length && this.state.initialRequestMade) {
      return (
        <div className="error-section">
          <p>This rover didn't take any photos in this sol using this camera.</p>
          
        </div>
      );
    } else { 
          return  (
              <div  className="photo-section">
                <div className="photo-album">
                    
                    {
                    this.state.responsePhotos&&this.state.responsePhotos.slice(0, this.state.visible).map((image, index) => (
                        <div  className = "photo-card ">
         
                        <img id="photo" key={index} className="mars-photo" src={image.img_src} width="300px" height="300px"/>
                        </div>
                         )) }
                  
                </div>
                <div className = "load-more-section">
                      {this.state.visible < this.state.responsePhotos.length &&
            <LinkButton text="Load more" onClick={this.loadMore}/>
             
          }
                    </div>
                    </div>
          );

      
     
    }
  }

 
  render() {
    const { max} = this.state;
    let roverCameras = {
      "spirit": [
        {
          abbrev: "NAVCAM",
          name:	"Navigation Camera"
        },
        {
          abbrev: "PANCAM",
          name:	"Panoramic Camera"
        }
      ],
      "curiosity": [
        {
          abbrev: "FHAZ",
          name: "Front Hazard Avoidance Camera"
        },
        {
          abbrev: "RHAZ",
          name:	"Rear Hazard Avoidance Camera"
        },
        {
          abbrev: "MAST",
          name:	"Mast Camera"
        },
        {
          abbrev: "CHEMCAM",
          name:	"Chemistry and Camera Complex"
        },
        {
          abbrev: "NAVCAM",
          name:	"Navigation Camera"
        },
      ],
      "opportunity": [
        {
          abbrev: "NAVCAM",
          name:	"Navigation Camera"
        },
        {
          abbrev: "PANCAM",
          name:	"Panoramic Camera"
        }
      ]
    }

    return (
      <div className="rover-section">
          <SectionTitle title="Mars Rover"/>
        <div className="choose rover">
      
       <SectionSubtitle title="Choose a Mars rover:"/>
          <select value={this.state.roverChosen} onChange={this.handleRoverSelection}>
            <option value="curiosity">Curiosity</option>
            <option value="spirit">Spirit</option>
            <option value="opportunity">Opportunity</option>
          </select>
        
        </div>

        <div className="choose camera">
        <SectionSubtitle title="Choose a camera:"/>
          <select value={this.state.cameraChosen} onChange={this.handleCameraSelection}>
            <option value={''}>Cameras:</option>
            {roverCameras[this.state.roverChosen].map((cameraObj) =>
              <option key={cameraObj.abbrev} value={cameraObj.abbrev}>{cameraObj.name}</option>
            )}
          </select>
        
        </div>
        <div className="slider">
             
             <div className="price-input">
           <span className="range-span"> Choose sol: </span>
           <InputNumber
             className="max-input-main"
             min={0}
             max={3026}
             value={max}
             defaultValue={max}
             onChange={this.handleSolSelection}
           />
           </div>
           <div className="range-slider">
           <Slider
           className="slider-main-div"
           min={0}
           max={3026}
           step={1}
           onChange={this.handleSolSelection}
           range={false}
           defaultValue={max}
           value={max}
         />
         </div>
           </div>      
        
        
        
        <LinkButton link="photo" text="Get photos" onClick={this.handleSubmit}/>
        <p>{this.state.loading}</p>
        
     

        {this.renderPhotoOrNotFoundMessage()}
        
        
                
        </div>
    );
  }
}

export default Rover;