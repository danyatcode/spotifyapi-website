import { Cookies } from 'react-cookie';
import { setLogIn } from '../../redux/actions/actions';
import store from '../../redux/store';
import { fetchProfile } from '../fetchesUser/FetchProfile';
import { fetchPlaylists } from '../fetchesUser/FetchPlaylists';
import {Buffer} from 'buffer';
import axios from 'axios'
import { fetchFeatured } from '../fetchesUser/FetchFeatured';

const cookies = new Cookies();
const client_id = "cf304debd56947f181794e3a88c29e9d";
const client_secret = "4e209384d85d4829b187abba19a9d060";


export async function getRefreshToken(refreshToken: string): Promise<void> {

  const encodedRefreshToken = encodeURIComponent(refreshToken);

  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    method: 'POST',
    headers: { 
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))
    },
    data: new URLSearchParams({
      'grant_type': 'refresh_token',
      'refresh_token': encodedRefreshToken,
    }).toString(),
  };

  const result = await axios(authOptions);
  console.log(result)
  const {access_token, refresh_token} = result.data;

  if(typeof access_token === 'string'){
    cookies.set('access_token', access_token)
    console.log(access_token)
    store.dispatch(setLogIn())

    fetchProfile(access_token)
    
    fetchPlaylists(access_token)

    fetchFeatured(access_token)
  }

  if(typeof refresh_token === 'string'){
      cookies.set('refresh_token', refresh_token)
  }
}