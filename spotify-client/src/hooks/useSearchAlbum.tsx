import React, { useEffect } from 'react';
import axios from "axios";
import { SearchAlbumUI } from '../types/types';

const useSearchAlbum = (setAlbums: React.Dispatch<React.SetStateAction<SearchAlbumUI[]>>, searchStr: string, token:string)=> {

    async function FetchData(){
        const authOptions = {
          url: 'https://api.spotify.com/v1/search?q=' + searchStr + "&type=album&offset=0&limit=4",
          method: 'GET',
          headers: { 
            'Authorization': 'Bearer ' + token
          },
        };
        const result = await axios(authOptions);
  
        if(result.status === 200){
            setAlbums(result.data?.albums?.items)
        }
    }

    useEffect(() => {
        FetchData();
    }, [searchStr, token]);

    return () => {};
};

export {useSearchAlbum}