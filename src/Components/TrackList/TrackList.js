import React, { Component } from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends Component {
  

  
  render() {
    return (
      <div className="TrackList">
        { 
          this.props.tracks.map(track => {
            return <Track 
                        key={track.id}
                        track={track}
                        isRemoval={this.props.isRemoval}
                        onAdd={this.props.onAdd}
                    />;
          })
        }
          { /*<!-- You will add a map method that renders a set of Track components  --> */}
      </div>
    );
  }
}

export default TrackList;