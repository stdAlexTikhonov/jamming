import React, { Component } from 'react';
import './Track.css';

class Track extends Component {
  
  constructor(props) {
    super(props);
    
    this.renderAction = this.renderAction.bind(this);
    this.addTrack = this.addTrack.bind(this);

  }
  
  addTrack() {
    this.props.onAdd(this.props.track.id);
  }
  
  
  renderAction() {
    if(this.props.isRemoval) {
      return <a className='Track-action'>-</a>
    } else {
      return <a onClick={this.addTrack} className='Track-action'>+</a>
    }
    
  }
  

  removeTrack() {
    
  }
  

  
  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{ this.props.track.name }</h3>
          <p>{this.props.track.artist} | {this.props.track.album} </p>
        </div>
        {this.renderAction()} 
      </div>
    );
  }
}

export default Track;