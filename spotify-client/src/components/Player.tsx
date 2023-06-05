import React, { useState } from 'react'
import { BsFillPauseFill, BsFillPlayFill, BsFillVolumeMuteFill, BsFillVolumeUpFill, BsVolumeDownFill } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { PlayerState, ShopReducerUI } from '../types/types'
import { usePlayerPlay } from '../hooks/usePlayerPlay'
import { usePlayerTime } from '../hooks/usePlayerTime'
import { usePlayerSwitch } from '../hooks/usePlayerSwitch'
import { GrChapterNext, GrChapterPrevious } from 'react-icons/gr'

export const Player: React.FC = () => {

  const player:PlayerState = useSelector((state: ShopReducerUI) => state.playerState);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [volume, setVolume] = useState<number>(1.0);
  const [volumeStage, setVolumeStage] = useState<number>(1);
  
  const dispatch = useDispatch();

  const audioRef = React.useRef<HTMLAudioElement>(null);

  React.useEffect(() => {
    console.log(player)

    const playAudio = async () => {
      if(audioRef.current?.src && player.state !== 'pause'){
        await audioRef.current?.play();
      }
      if(audioRef.current?.src && player.state === 'pause'){
        await audioRef.current.play();
        audioRef.current.pause();
      }
    };
    playAudio();

  }, [player, audioRef.current, dispatch])

  

  const handlePlay = usePlayerPlay(audioRef, player, dispatch);

  const { handlePlayNext, handlePlayPrev } = usePlayerSwitch(audioRef, player, dispatch);
 
  const  { handleTimeSet, handleTimeUpdate, handleEnded } = usePlayerTime(audioRef, player, dispatch, setCurrentTime);
  
  const handleVolumeChange = React.useCallback((event:React.ChangeEvent<HTMLInputElement>) => {

    const volumeValue:number = parseFloat(event.target.value);

    if(audioRef.current){
      audioRef.current.volume = volumeValue;
      setVolume(volumeValue);
      setVolumeStage(volumeValue / 1 * 100)
    }

  }, [audioRef.current, setVolume])

  return (
    <div className='player'>
      <div className='player-container'>
      {audioRef.current?.src && 
        <div className='player-audio-buttons'>
          <button className='play-prev' onClick={handlePlayPrev}><GrChapterPrevious /></button>
          {player.state === 'pause'? 
          <button className="audio-button" onClick={handlePlay}>
            <BsFillPlayFill></BsFillPlayFill>
          </button>
          :  player.state === 'play'?
          <button className="audio-button" onClick={handlePlay}>
            <BsFillPauseFill></BsFillPauseFill>
          </button>
          : false}
          <button className='play-next' onClick={handlePlayNext}><GrChapterNext/></button>
        </div>
      }
      <div className='player-song-info'>

        <div style={{width: '150px', display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
          <img className='player-song-image' src={player.pic}/>
          <span className='player-song-name'>{player.name}</span>
        </div>

       
          <audio 
            ref={audioRef} 
            src={player.url}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleEnded}
          >
          </audio>
        
        { 
        audioRef.current?.src
          &&
          <>
           <div style={{display: 'flex', alignItems: "center", justifyContent: "center", width: "100%"}} >
           <input 
              type='range' 
              step={0.01} 
              min={0} 
              max={isNaN(audioRef?.current?.duration) ? 'NaN' : audioRef.current.duration} 
              value={currentTime} 
              onChange={handleTimeSet}
              className='range-input song-duration'
              />
            </div>
          <div className='volume-div'>
            <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className='range-input'
              />
              {
                volumeStage >= 75 ? <BsFillVolumeUpFill className="volume-icon"/>
                :
                volumeStage >= 1 ? <BsVolumeDownFill className="volume-icon"/> 
                :
                <BsFillVolumeMuteFill className="volume-icon"/>
              }
          </div>
           
          </>
         
        }
      </div>
      
      
      
      </div>
      
    </div>
  )
}
