import React, { useEffect } from 'react';
import axios from "axios";
import { SearchArtistUI } from '../types/types';

const useSearchArtist = (setArtists: React.Dispatch<React.SetStateAction<SearchArtistUI[]>>, searchStr: string, token:string)=> {

    async function FetchData(){
        const authOptions = {
          url: 'https://api.spotify.com/v1/search?q=' + searchStr + "&type=artist&offset=0&limit=4",
          method: 'GET',
          headers: { 
            'Authorization': 'Bearer ' + token
          },
        };
        const result = await axios(authOptions);
  
        if(result.status === 200){
            setArtists(result.data?.artists?.items)
        }
    }

    useEffect(() => {
        FetchData();
    }, [searchStr, token]);

    return () => {};
};

export {useSearchArtist}