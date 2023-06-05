import { useCallback, RefObject } from 'react';
import { setPlayerState } from '../redux/actions/actions';
import { PlayerState } from '../types/types';
import { Dispatch } from 'redux';

const usePlayerPlay = (audioRef: RefObject<HTMLAudioElement>, player: PlayerState, dispatch: Dispatch<any>)=> {
    const handlePlay = useCallback(() => {

        const playerState = {
            ...player, state: 'play'
        }

    dispatch(setPlayerState(playerState))
    }, [audioRef.current, dispatch, player])

    const handlePause = useCallback(() => {
        
      if (audioRef.current?.play() !== undefined) {
        audioRef.current?.play().then(() => {
          audioRef.current?.pause();
        });
      }
      dispatch(setPlayerState({ ...player, state: 'pause' }));
    }, [audioRef, dispatch, player]);
  
    const handlePlayerToggle = player.state === 'play' ? handlePause : handlePlay;

    return handlePlayerToggle
};

export {usePlayerPlay}