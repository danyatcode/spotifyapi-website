import { setLogIn, setUserProfile } from '../../redux/actions/actions';
import store from '../../redux/store';
import { getRefreshToken } from '../tokens/getRefreshToken';
import { Cookies } from 'react-cookie';
const cookies = new Cookies();


export async function fetchProfile(token: string): Promise<any> {
    try{
        const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET", 
        headers: { Authorization: `Bearer ${token}` }
    });
        if(!result.ok){
            if(result.status === 401){
                store.getState()
                getRefreshToken(cookies.get('refresh_token'))
            }
        }
        else{
            store.dispatch(setLogIn())
            const data = await result.json();
            store.dispatch(setUserProfile(data))
        }
    } catch(e){
        console.log(e)
    }
}