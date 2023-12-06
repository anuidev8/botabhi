import React, { useState, useRef, useEffect } from 'react';

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5); // Default volume is set to 50%
  const audioPlayer = useRef(null);

  const audioSrc = './MixHangpan.mp3'; // Replace with your audio file path

  const toggleAudio = () => {
    const audio = audioPlayer.current;
    if (audio.paused || audio.ended) {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(error => {
        console.error('Autoplay was prevented:', error);
      });
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const handleVolumeChange = (e) => {
    const audio = audioPlayer.current;
    const newVolume = e.target.value;
    audio.volume = newVolume;
    setVolume(newVolume);
  };

  useEffect(() => {
    const audio = audioPlayer.current;
    const playPromise = audio.play();
    
    if (playPromise !== undefined) {
      playPromise.then(() => {
        setIsPlaying(true);
        audio.volume = 10;
    setVolume(10);
      }).catch(error => {
        console.error('Autoplay was prevented:', error);
      });
    }
  }, []);

  return (
    <div style={{ position:'fixed',zIndex:'100',left:'3%',width:'15rem',bottom:'5%' ,display:'flex'}}>
      <audio ref={audioPlayer} src={audioSrc} preload='auto'></audio>
      <div>
      <button onClick={toggleAudio} type='button' style={{ backgroundColor:'rgba(255, 255, 255, 0.3)', fontSize: '2rem',width:'3rem',color:'white' ,height:'3rem',borderRadius:'50%',border:'none',outline:'none',}}>
        {isPlaying ? <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 512 512" height="1em" width="1em" ><path d="M215.03 71.05L126.06 160H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V88.02c0-21.46-25.96-31.98-40.97-16.97zM461.64 256l45.64-45.64c6.3-6.3 6.3-16.52 0-22.82l-22.82-22.82c-6.3-6.3-16.52-6.3-22.82 0L416 210.36l-45.64-45.64c-6.3-6.3-16.52-6.3-22.82 0l-22.82 22.82c-6.3 6.3-6.3 16.52 0 22.82L370.36 256l-45.63 45.63c-6.3 6.3-6.3 16.52 0 22.82l22.82 22.82c6.3 6.3 16.52 6.3 22.82 0L416 301.64l45.64 45.64c6.3 6.3 16.52 6.3 22.82 0l22.82-22.82c6.3-6.3 6.3-16.52 0-22.82L461.64 256z" /></svg>
 :  <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 16 16" height="1em" width="1em" ><path fillRule="evenodd" d="M12 8.02c0 1.09-.45 2.09-1.17 2.83l-.67-.67c.55-.56.89-1.31.89-2.16 0-.85-.34-1.61-.89-2.16l.67-.67A3.99 3.99 0 0 1 12 8.02zM7.72 2.28L4 6H2c-.55 0-1 .45-1 1v2c0 .55.45 1 1 1h2l3.72 3.72c.47.47 1.28.14 1.28-.53V2.81c0-.67-.81-1-1.28-.53zm5.94.08l-.67.67a6.996 6.996 0 0 1 2.06 4.98c0 1.94-.78 3.7-2.06 4.98l.67.67A7.973 7.973 0 0 0 16 8c0-2.22-.89-4.22-2.34-5.66v.02zm-1.41 1.41l-.69.67a5.05 5.05 0 0 1 1.48 3.58c0 1.39-.56 2.66-1.48 3.56l.69.67A5.971 5.971 0 0 0 14 8.02c0-1.65-.67-3.16-1.75-4.25z" /></svg>}
      </button> 
      </div>
      <br />
      <div style={{ marginTop: '10px' ,marginLeft:'1rem'}}>
        <label htmlFor="volume" style={{ marginRight: '10px' ,color:'white'}}>Volume:</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          style={{
            width: '200px',
            height: '5px',
            borderRadius: '5px',
            background: '#ddd',
            outline: 'none',
            cursor: 'pointer'
          }}
        />
      </div>
    
    </div>
  );
};

export default AudioPlayer;
