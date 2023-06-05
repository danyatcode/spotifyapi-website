import { setUserPlaylists } from '../../redux/actions/actions';
import store from '../../redux/store';
import { getRefreshToken } from '../tokens/getRefreshToken';
import { Cookies } from 'react-cookie';

export async function fetchPlaylists(token: string) {

  const cookies = new Cookies();
  try{
      const result = await fetch("https://api.spotify.com/v1/me/playlists", {
        headers: {
          'Access-Control-Request-Method': 'GET',
          'Access-Control-Request-Headers': '*',
          Authorization: `Bearer ${token}`,
        },
      });
      if (result.ok){
        const playlists = await result.json();
        store.dispatch(setUserPlaylists(playlists))
        return playlists;
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