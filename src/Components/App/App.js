import React, { Component } from 'react';
import './App.css';
import SearchResults from '../SearchResults/SearchResults';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [{
        name: 'Name1',
        artist: 'Artist1',
        album: 'Album1',
        track: 'Track1'
      }, {
        name: 'Name2',
        artist: 'Artist2',
        album: 'Album2',
        track: 'Track2'
      }, {
        name: 'Name3',
        artist: 'Artist3',
        album: 'Album3',
        track: 'Track3'
      }]
    }
  }
  
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          { /* <SearchBar />  */}
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} />
            { /* <Playlist/> */ }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
