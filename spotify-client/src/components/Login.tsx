import React from 'react'
import { fetchData } from '../services/FetchData';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { Playlist, ShopReducerUI, UserProfile } from '../types/types';

export const Login: React.FC = () => {
    const navigate = useNavigate();
    
    const [cookies] = useCookies(['access_token']);
    
    const loggedState = useSelector((state: {logState: boolean}) => state.logState)
    const profile:UserProfile = useSelector((state: ShopReducerUI): UserProfile => state.userProfile)
    const playlists: Playlist[]  = useSelector((state: ShopReducerUI): Playlist[] => state.userPlaylists?.items)
    
    React.useEffect(() => {
        if(!cookies.access_token){
            fetchData();
        }
    }, [loggedState])

    React.useEffect( () =>{
         if(playlists){
            setTimeout(() => navigate('/'), 500)
         }
        }, [profile, playlists])

  return (
    <>

        {!loggedState && <div>You are logged out</div>}
        {profile.images && cookies.access_token &&
            <>
                <img style={{marginTop: "150px"}} src={profile.images && profile.images[0].url}/>
                <h2 className='user-name'>Greetings, {profile?.display_name}</h2>
                <h2>You succesfully logged in</h2>
            </>
        }
    </>
  )
}
