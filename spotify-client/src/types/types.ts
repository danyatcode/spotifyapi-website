export interface Playlist {
    id:number,
    name: string;
    tracks: {
        total:number
    };
    images:{
        url: string
    }[]
 }

export interface PlaylistExtended {
    track:{
        album:{
            images:{
                url: string
            }[]
        };
        preview_url: string;
        name: string
    }
 }

 export interface PlayerState {
    name: string;
    pic: string;
    url: string;
    state: string;
    index: number
}

 export interface UserProfile {
    images: {
        url: string
    }[];
    display_name: string
}


export type PlayerReducer = {
    type: string;
    payload: PlayerState
}
export type ProfileReducer = {
    type: string;
    payload: UserProfile
}
export type PlaylistReducer = {
    type: string;
    payload: Playlist
}
export type searchStreamReducerUI = {
    type: string;
    payload: string
}
export type PlaylistExtendedReducer = {
    type: string;
    payload: PlaylistExtendedReducer
}

export type SearchTrackUI = {
    name: string,
    album: {
        images: {
            url: string
        }[]
    },
    preview_url:string,
    artists: {
      name: string  
    }[]
}

export type SearchArtistUI = {
    name: string,
    images: {
        url: string
    }[]
}

export type SearchAlbumUI = {
    name: string,
    images: {
        url: string
    }[],
    type: string
}

export type ShopReducerUI = {
    logState: boolean,
    userProfile: UserProfile,
    userPlaylists: {
        items: Array<Playlist>
    },
    selectedPlaylist: {
        items:PlaylistExtended[]
    },
    featuredPlaylists:{ 
        playlists: {
            items: Array<Playlist>
        }
    },
    playerState: PlayerState,
    searchStr: string
}