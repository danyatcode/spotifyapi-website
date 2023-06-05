import React, { FC } from "react"
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import { fetchProfile } from "../services/fetchesUser/FetchProfile";
import { useDispatch } from "react-redux";
import { clearSelectedPlaylist, setLogOut } from "../redux/actions/actions";
import { fetchPlaylists } from "../services/fetchesUser/FetchPlaylists";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchFeatured } from "../services/fetchesUser/FetchFeatured";
import { Playlist, ShopReducerUI} from "../types/types";
import { fetchData } from "../services/FetchData";

export const Home:FC = () => {
  const [cookies] = useCookies(['access_token'])
  const dispatch = useDispatch()
  const location = useLocation()

  const navigate = useNavigate();
  const loggedState = useSelector((state: {logState: boolean}) => state.logState)

  const profile = useSelector((state: ShopReducerUI) => state.userProfile)
  const featuredPlaylists:Playlist[] = useSelector((state: ShopReducerUI): Playlist[] => state.featuredPlaylists?.playlists?.items) 
  const userPlaylists:Playlist[] = useSelector((state: ShopReducerUI):Playlist[] => state.userPlaylists?.items)
  const playlists: Playlist[]  = useSelector((state: ShopReducerUI): Playlist[] => state.userPlaylists?.items)

  React.useEffect( () => {
    async function checkData(){
      if(!cookies.access_token){
        dispatch(setLogOut())      
      }
      else{
        await fetchProfile(cookies.access_token)
        await fetchPlaylists(cookies.access_token)
        await fetchFeatured(cookies.access_token)
      }
    }
    checkData()

    return () => {
      dispatch(clearSelectedPlaylist());
    }
  }, [location])


  React.useEffect(() => {
      if(!cookies.access_token){
          fetchData();
      }
  }, [loggedState])

  return (
    <div className="home-page">
      <div className="home-page-container">
        <div className="home-section">
          <div className="home-section-title">Greetings!</div>

          {profile.display_name && <h2 className="home-users-playlists">Your playlists</h2>}
          {!profile.display_name && <h2 className="home-users-playlists">Please Log In</h2>}
          <div className="home-section-grid">
            {userPlaylists?.map( (item: Playlist) => {
                return <Link to={`me/playlist/${item?.id}&total=${item?.tracks.total}`} key={item.id}>
                <div className="home-grid-item">
                  <div className="grid-image-div">
                    {item?.images && <img src={item?.images[0].url} alt="Playlist Image"/>}
                  </div>
                  <h4 className="item-title">{item?.name}</h4>
                </div>
                </Link>
            })}
          </div>

          {profile.display_name && <h2 className="home-users-playlists">Featured playlists</h2>}
          <div className="home-section-grid">
            {featuredPlaylists?.map((item : Playlist) => {
                return <Link to={`me/playlist/${item?.id}&total=${item?.tracks.total}`} key={item?.id}>
                <div className="home-grid-item">
                  <div className="grid-image-div">
                    {item?.images && <img src={item?.images[0].url} alt="Playlist Image"/>}
                  </div>
                  <h4 className="item-title">{item?.name}</h4>
                </div>
                </Link>
            })}
          </div>
        </div>
      </div> 
    </div>
  )
}
