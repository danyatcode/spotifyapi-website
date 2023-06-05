import { useCallback, RefObject } from 'react';
import { setPlayerState } from '../redux/actions/actions';
import { Dispatch } from 'redux';
import { PlayerState, PlaylistExtended, ShopReducerUI } from '../types/types';
import { useSelector } from 'react-redux';

const usePlayerSwitch = (
        audioRef: RefObject<HTMLAudioElement>, 
        player: PlayerState, 
        dispatch: Dispatch<any>, 
    ) => 

    {
        const playlists:PlaylistExtended[] = useSelector((state: ShopReducerUI):PlaylistExtended[] => state.selectedPlaylist.items);
        
        const availableTracks = playlists?.filter( item => item.track.preview_url);
        const availableTrackIndex = availableTracks?.indexOf(playlists[player.index]);

        const handlePlayNext = useCallback(() => {

            console.log(availableTrackIndex)
            const nextIndex = availableTrackIndex + 1 === availableTracks.length ? 0 : availableTrackIndex  + 1

            const playerState = {
                name: availableTracks[nextIndex].track?.name,
                pic: availableTracks[nextIndex].track?.album.images[2]?.url,
                url: availableTracks[nextIndex].track?.preview_url,
                state: 'play',
                index: playlists.indexOf(availableTracks[nextIndex])
              }
              
              dispatch(setPlayerState(playerState))

        }, [audioRef, player, dispatch, playlists]);

        const handlePlayPrev = useCallback(() => {
            
            const prevIndex = availableTrackIndex - 1 < 0 ? availableTracks.length - 1 : availableTrackIndex  - 1

            const playerState = {
                name: availableTracks[prevIndex].track.name,
                pic: availableTracks[prevIndex].track.album.images[2]?.url,
                url: availableTracks[prevIndex].track.preview_url,
                state: 'play',
                index: playlists.indexOf(availableTracks[prevIndex])
              }
              
              dispatch(setPlayerState(playerState))

        }, [audioRef, player, dispatch]);


        return { handlePlayNext, handlePlayPrev };

    };

export { usePlayerSwitch };