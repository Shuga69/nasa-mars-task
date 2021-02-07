import React, {Component} from 'react';
import "../styles/VideoBackground.css";
import titleVideo from "../assets/BackgroundVideo.mp4"
import Fade from 'react-reveal/Fade';
import LinkButton from './LinkButton'
import {Link} from "react-scroll";


export default class Home extends Component {
    
    render() {
        
        return (
    <div className="intro">
        <video className="title-video" autoPlay loop muted >
                        <source src = {titleVideo} type = 'video/mp4'/>
                        <source src = {titleVideo} type = 'video/ogg' codecs= 'theora, vorbis'/>
                    </video>
        <Fade left big cascade>
        <div className="text-section">
                <h1 className="background-title">Visit <nobr >Mars</nobr> in just<br/>two clicks</h1>
                <div className="desc">Explore Mars with<br/> NASA</div>
            <Fade left big cascade>
                <LinkButton  link="rover-section" text="Get Started" className="btn-link">Замовити</LinkButton>
            </Fade>
            </div>
        </Fade>
    </div>
        

        )
    }
}