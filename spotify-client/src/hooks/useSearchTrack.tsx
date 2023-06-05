import React, { useEffect } from 'react';
import axios from "axios";
import { SearchTrackUI } from '../types/types';

const useSearchTrack = (setTracks: React.Dispatch<React.SetStateAction<SearchTrackUI[]>>, searchStr: string, token:string)=> {

    async function FetchData(){
        const authOptions = {
          url: 'https://api.spotify.com/v1/search?q=' + searchStr + "&type=track&offset=0&limit=4",
          method: 'GET',
          headers: { 
            'Authorization': 'Bearer ' + token
          },
        };
        const result = await axios(authOptions);
  
        if(result.status === 200){
            setTracks(result.data?.tracks?.items)
        }
    }

    useEffect(() => {
        FetchData();
    }, [searchStr, token]);

    return () => {};
};

export {useSearchTrack}