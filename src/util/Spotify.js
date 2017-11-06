
let accessToken, expiresIn;
const client_id = 'f345dea5f0a44236a8f68c75e70d8adf'; // Your client id
const client_secret = '30dfa157c3774f638436734e2666b8e7'; // Your secret
const redirect_uri = 'http://localhost:3000/'; // Your redirect uri



const Spotify = {
  getAccessToken: () => {
    if (accessToken) {
      return accessToken;
    } 
    
    accessToken = window.location.href.match(/access_token=([^&]*)/);
    expiresIn = window.location.href.match(/expires_in=([^&]*)/);
    
    if (accessToken && expiresIn) {
      accessToken = accessToken[1];
      expiresIn = expiresIn[1];
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_uri}`;
      window.location = accessUrl;
    }
    
  },
  search(term) {
    this.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      return jsonResponse.tracks.items.map(track => {
        return {
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        }
      });
    });


  },
  savePlaylist(playlistName, tracks) {
    this.getAccessToken();
    let headers = { Authorization: `Bearer ${accessToken}`};
    let userID, playlistID;
    if (playlistName && tracks.length > 0) {
      fetch(`https://api.spotify.com/v1/me`,
        { headers: headers }
      ).then(response => response.json()).then(jsonResponse => {
        return jsonResponse.id;
      }).then(userID => {
        fetch(`https://api.spotify.com/v1/users/${userID}/playlists`,
        {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({name: playlistName})
          
        }).then(response => response.json()).then(jsonResponse => {
          playlistID = jsonResponse.id;

          //Adding tracks to playlist on user's account
            return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`,{
              headers: headers,
              method: 'POST',
              body: JSON.stringify({uris: tracks})
            });
        })
      })
      
      

      
      
      
    }

  }
};

export default Spotify;


// var scope = 'user-read-private user-read-email';
// res.redirect('https://accounts.spotify.com/authorize?' +
//   querystring.stringify({
//     response_type: 'code',
//     client_id: client_id,
//     scope: scope,
//     redirect_uri: redirect_uri,
//     state: state
//   }));