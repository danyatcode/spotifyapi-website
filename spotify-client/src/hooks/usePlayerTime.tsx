import { useCallback, RefObject } from 'react';
import { setPlayerState } from '../redux/actions/actions';
import { Dispatch } from 'redux';
import { PlayerState } from '../types/types';

const usePlayerTime = (
        audioRef: RefObject<HTMLAudioElement>, 
        player: PlayerState, 
        dispatch: Dispatch<any>, 
        setCurrentTime: React.Dispatch<React.SetStateAction<number>>
    ) => {

  const handleTimeSet = useCallback((e:React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  }, [audioRef, setCurrentTime]);

  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current?.currentTime);
    }
  }, [audioRef, setCurrentTime]);

  const handleEnded = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = audioRef.current.duration - 0.05;
      setCurrentTime(audioRef.current.duration);
      dispatch(setPlayerState({ ...player, state: 'pause' }));
    }
  }, [audioRef, setCurrentTime, player, dispatch]);

  return { handleTimeSet, handleTimeUpdate, handleEnded };

};

export { usePlayerTime };