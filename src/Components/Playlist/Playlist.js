import React, { Component } from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

class Playlist extends Component {

  constructor(props) {
    super(props);
    this.handleChangeName = this.handleChangeName.bind(this);
  }

  handleChangeName(e) {
    this.props.onChangeName(e.target.value);
  }

  render() {
    return (
      <div className="Playlist">
        <input defaultValue={this.props.name} onChange={this.handleChangeName}/>
         <TrackList tracks={this.props.tracks} isRemoval={true} onRemove={this.props.onRemove} /> 
        <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

export default Playlist;