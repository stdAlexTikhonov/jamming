import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'New playlist',
      playlistTracks: []
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    if(this.state.playlistTracks.every(item => item.id !== track.id)) {
      let newPlaylist = this.state.playlistTracks;
      newPlaylist.push(track);
      this.setState({
        playlistTracks: newPlaylist
      });
    }
  }
  
  removeTrack(track) {
    var newPlaylist = this.state.playlistTracks.filter(item => item.id !== track.id);
    this.setState({
      playlistTracks: newPlaylist
    })
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    });
  }
  
  savePlaylist() {
    let trackURIs = this.state.playlistTracks.map(track => track.uri);
    let name = this.state.playlistName;
    Spotify.savePlaylist(name, trackURIs);
    this.setState({
      searchResults: [],
      playlistName: 'New playlist'
    });
  }
  
  search(term) {
    Spotify.search(term).then(tracks => {
      this.setState({
        searchResults: tracks
      })
    });
  }
  
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} onSearch={this.search}/>
            <Playlist name={this.state.playlistName} tracks={this.state.playlistTracks} onRemove={this.removeTrack} onChangeName={this.updatePlaylistName} onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
