import React from 'react'
import { useCookies } from 'react-cookie'
import { useParams } from 'react-router'
import { fetchProfile } from '../services/fetchesUser/FetchProfile'
import { fetchPlaylist } from '../services/fetchesUser/FetchPlaylist'
import { useSelector } from 'react-redux'
import {BsFillPlayFill, BsFillPauseFill} from 'react-icons/bs'
import { fetchFeatured } from '../services/fetchesUser/FetchFeatured'
import { clearSelectedPlaylist, setPlayerState } from '../redux/actions/actions'
import { useDispatch } from 'react-redux'
import { PlaylistExtended, ShopReducerUI } from '../types/types'


export const Playlist: React.FC = () => {
  const [cookies] = useCookies(['access_token']);
  const dispatch = useDispatch();
  const player = useSelector((state: ShopReducerUI) => state.playerState);

  function handlePlay(index: number) {
    
    const playerState = {
      name: playlists[index].track.name,
      pic: playlists[index].track.album.images[2]?.url,
      url: playlists[index].track.preview_url,
      state: 'play',
      index: index
    }
    
    dispatch(setPlayerState(playerState))
  }

  const playlistURL = useParams().playlistId as string;
  const playlistID = playlistURL.split('&')[0];
  const playlistTotal = playlistURL.split('total=')[1];

  const playlists:PlaylistExtended[] = useSelector((state: ShopReducerUI):PlaylistExtended[] => state.selectedPlaylist.items);

  async function checkData() {
    await fetchProfile(cookies.access_token);
    await fetchPlaylist(cookies.access_token, playlistID);
    await fetchFeatured(cookies.access_token);
  }

  React.useEffect(() => {
    checkData();
  }, [cookies.access_token]);

  React.useEffect(() => {
  return () => {
      dispatch(clearSelectedPlaylist());
    };
  }, [playlistURL]);

  function handlePause(){
    dispatch(setPlayerState({...player, state: 'pause'}))
  }
    
      return (
        <div className="home-page">
          <div className="home-page-container">
            <div className="home-section">
              <div className="home-section-title"><span>Playlist Tracks</span> <small>{playlistTotal} tracks</small></div>
              <div className="playlist-section-grid">
                {playlists?.map( (item, index) => {
                        return <div className="playlist-grid-item" key={index} style={item.track.preview_url? {"opacity" : 1}: {"opacity" : 0.4}}>
                          <span className='item-index'>{index + 1}</span>
                          <div className="grid-image-div">
                            {item.track.album.images && <img src={item.track.album.images[2].url} alt="Playlist Image"/>}
                          </div>
                          <h4 className="item-title">{item.track.name}</h4>
                        <div key={index} className='item-inner-button'>
                          {
                             player.state === 'play' && player.name === item.track.name ?  
                             <button 
                             className="audio-button" 
                             disabled={item.track.preview_url? false: true} onClick={() => handlePause()}
                             >
                              <BsFillPauseFill></BsFillPauseFill>
                              </button>
                             :
                             <button 
                              className="audio-button" 
                              disabled={item.track.preview_url? false: true} onClick={() => handlePlay(index)}
                             >
                              <BsFillPlayFill></BsFillPlayFill>
                            </button>
                          }
                        </div>
                    </div> 

                })}
              </div>
            </div>
          </div> 
        </div>
      )
}
