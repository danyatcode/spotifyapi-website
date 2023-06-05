import { Cookies } from 'react-cookie';
import { setLogIn } from '../../redux/actions/actions';
import store from '../../redux/store';
import { fetchProfile } from '../fetchesUser/FetchProfile';
import { fetchPlaylists } from '../fetchesUser/FetchPlaylists';
import { fetchFeatured } from '../fetchesUser/FetchFeatured';

const cookies = new Cookies();

const port = "127.0.0.1:5173";

export async function getAccessToken(clientId: string, code: string): Promise<string> {
    const verifier = localStorage.getItem("verifier");
    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    // params.append("redirect_uri", "https://danyatcode.github.io/spotify-clone/login");
    params.append("redirect_uri", `http://${port}/login`);
    params.append("code_verifier", verifier!);

    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
    });

    const { access_token, refresh_token } = await result.json()

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
    
    return access_token
}