import { PlayerReducer, PlaylistExtendedReducer, PlaylistReducer, ProfileReducer, searchStreamReducerUI } from "../../types/types";
import { ActionTypes } from "../constants/action-types"
import { combineReducers } from "redux";

const initState:boolean = false
const initProfile = {}
const initPlaylists = {}
const initPlayer = {}
const initString:string = ""

export const setLoggedReducer = (state = initState, {type}:{type:string}) => {
    switch(type){
        case ActionTypes.SET_IS_LOGGEDIN: return true
        case ActionTypes.SET_IS_LOGGEDOUT: return false 
        default: return state
    }
}
// pepega mode object created ///////////////////////////////////////////
export const setPlayerReducer = (state = initPlayer, {type, payload}:PlayerReducer) => {
    switch(type){
        case ActionTypes.SET_PLAYER_STATE: return {...state, ...payload}
        default: return state
    }
}

export const setUserProfileReducer = (state = initProfile, {type, payload}:ProfileReducer) => {
    switch(type){
        case ActionTypes.SET_USER_PROFILE: return {...state, ...payload}
        case ActionTypes.CLEAR_USER_PROFILE: return {}
        default: return state
    }
}
export const setUserPlaylistReducer = (state = initPlaylists, {type, payload}:PlaylistReducer) => {
    switch(type){
        case ActionTypes.SET_USER_PLAYLISTS: return {...state, ...payload}
        case ActionTypes.CLEAR_PLAYLISTS: return []
        default: return state
    }
}
export const setSelectedPlaylistReducer = (state = initPlaylists, {type, payload}:PlaylistExtendedReducer) => {
    switch(type){
        case ActionTypes.SET_SELECTED_PLAYLIST: return {...state, ...payload}
        case ActionTypes.CLEAR_SELECTED_PLAYLIST: return []
        default: return state
    }
}
export const setFeaturedPlaylistsReducer = (state = initPlaylists, {type, payload}:PlaylistReducer) => {
    switch(type){
        case ActionTypes.SET_FEATURED_PLAYLISTS: return {...state, ...payload}
        case ActionTypes.CLEAR_PLAYLISTS: return []
        default: return state
    }
}

export const setSearchStrReducer = (state = initString, {type, payload}:searchStreamReducerUI) => {
    switch(type){
        case ActionTypes.SET_SEARCH_STRING: return payload
        default: return state
    }
}


const reducers = combineReducers({
    logState: setLoggedReducer,
    userProfile: setUserProfileReducer,
    userPlaylists: setUserPlaylistReducer,
    selectedPlaylist: setSelectedPlaylistReducer,
    featuredPlaylists: setFeaturedPlaylistsReducer,
    playerState: setPlayerReducer,
    searchStr: setSearchStrReducer,
})

export default reducers