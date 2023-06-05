import { setSelectedPlaylist } from '../../redux/actions/actions';
import store from '../../redux/store';
import { getRefreshToken } from '../tokens/getRefreshToken';
import { Cookies } from 'react-cookie';
  
export async function fetchPlaylist(token: string, id: string) {
    const cookies = new Cookies();
    try{
      const result = await fetch(`https://api.spotify.com/v1/playlists/${id}/tracks?offset=0&limit=100&locale=en-US,en;q=0.9,uk;q=0.8`, {
        headers: {
          'Access-Control-Request-Method': 'GET',
          'Access-Control-Request-Headers': '*',
          Authorization: `Bearer ${token}`,
        },
      });
      if (result.ok){
        const playlist = await result.json();
        store.dispatch(setSelectedPlaylist(playlist))
        return playlist;
      }
      else{
        if(result.status === 401){
            getRefreshToken(cookies.get('refresh_token'))
        }
      }
    }catch(e){
      console.log(e)
    }
     
  }
  

// https://api.spotify.com/v1/users/31algtaddct4fltizvqokunnd2uu/playlists