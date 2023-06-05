import { useCookies } from "react-cookie"
import React from "react"
import { fetchProfile } from "../services/fetchesUser/FetchProfile"
import { useSelector } from "react-redux"
import { SearchAlbumUI, SearchArtistUI, SearchTrackUI, ShopReducerUI } from "../types/types"
import { useSearchTrack } from "../hooks/useSearchTrack"
import { useSearchAlbum } from "../hooks/useSearchAlbum"
import { useSearchArtist } from "../hooks/useSearchArtist"

export const Search: React.FC = () => {
  const [cookies] = useCookies(['access_token'])
  const searchStr = useSelector((state: ShopReducerUI) => state.searchStr) 

  const [tracks, setTracks] = React.useState<SearchTrackUI[]>([])
  const [artists, setArtists] = React.useState<SearchArtistUI[]>([])
  const [albums, setAlbums] = React.useState<SearchAlbumUI[]>([])

  React.useEffect( () => {
    async function checkData(){
      if(!cookies.access_token){   
      }
      else{
        await fetchProfile(cookies.access_token)
      }
    }
    checkData()

    return () => {
    }
  }, [])

  const getTracks = useSearchTrack(setTracks, searchStr, cookies.access_token);
  const getAlbums = useSearchAlbum(setAlbums, searchStr, cookies.access_token);
  const getArtist = useSearchArtist(setArtists, searchStr, cookies.access_token);

  React.useEffect( () => {
    if(searchStr !== ""){
      getAlbums();
      getArtist();
      getTracks()
    }
    
  }, [searchStr, cookies.access_token])

  console.log(tracks, albums, artists)
      return (
        <div className="home-page">
          <div className="container" style={{display: "flex"}}>
            <div className="search-flex">
              <div className="search-results search-tracks">
                <h3>Tracks</h3>
                <div className="search-items-grid">
                  {tracks?.map( item => 
                  <div className="search-items">
                    <span className="search-item-name ">{item.name}</span>
                    {item?.album?.images && <img src={item.album?.images[1]?.url} width={300} height={300}/>}
                  </div>
                  )}
                </div>
              </div>            
              <div className="search-results search-albums">
                  <h3>Albums</h3>
                  <div className="search-items-grid">
                  {albums?.map( item => 
                    <div className="search-items">
                      <span className="search-item-name ">{item?.name}</span>
                      {item?.images && <img src={item.images[1]?.url} width={300} height={300}/>}
                    </div>
                    )}
                  </div>
              </div>            
              <div className="search-results search-artists">
                <h3>Artists</h3>
                <div className="search-items-grid">
                  {artists?.map( item => 
                  <div className="search-items">
                    <span className="search-item-name ">{item?.name}</span>
                    {item?.images && <img src={item.images[1]?.url} width={300} height={300}/>}
                  </div>
                  )}
                </div>
              </div>  
            </div>         
          </div> 
        </div>
      )
}
