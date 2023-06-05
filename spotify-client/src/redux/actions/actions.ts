import { PlayerState, Playlist, UserProfile } from "../../types/types";
import { ActionTypes } from "../constants/action-types";

export const setLogIn = () => {
    return {
        type: ActionTypes.SET_IS_LOGGEDIN
    }
}

export const setLogOut = () => {
    return {
        type: ActionTypes.SET_IS_LOGGEDOUT
    }
}

export const setUserProfile = (data: UserProfile) => {
    return {
        type: ActionTypes.SET_USER_PROFILE,
        payload: data
    }   
}
export const clearUserProfile = () => {
    return {
        type: ActionTypes.CLEAR_USER_PROFILE,
    }   
}


export const setSelectedPlaylist = (data: Playlist) => {
    return {
        type: ActionTypes.SET_SELECTED_PLAYLIST,
        payload: data
    }   
}

export const clearSelectedPlaylist = () => {
    return {
        type: ActionTypes.CLEAR_SELECTED_PLAYLIST
    }   
}

export const setUserPlaylists = (data: Playlist[]) => {
    return {
        type: ActionTypes.SET_USER_PLAYLISTS,
        payload: data
    }   
}

export const setFeaturedPlaylists = (data: Playlist) => {
    return {
        type: ActionTypes.SET_FEATURED_PLAYLISTS,
        payload: data
    }   
}
export const clearPlaylists = () => {
    return {
        type: ActionTypes.CLEAR_PLAYLISTS,
    }   
}



export const setPlayerState = (data: PlayerState) => {
    return {
        type: ActionTypes.SET_PLAYER_STATE,
        payload: data
    }   
}


export const setSearchStr = (value:string) => {
    return {
        type: ActionTypes.SET_SEARCH_STRING,
        payload: value
    }   
}


