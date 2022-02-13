import { useEffect, useRef, useState } from "react";
import AudioControls from "./audioControls";

interface Url {
    url?: string
}

const AudioPlayer = ({ url }: Url) => {
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // ref
  const audioRef = useRef(new Audio(url));
  const intervalRef = useRef<NodeJS.Timer>();
  const isReady = useRef(false);

  const { duration } = audioRef.current;
  const currentPercentage = duration
    ? `${(trackProgress / duration) * 100}%`
    : "0%";
  const trackStyling = `
    -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))
  `;

  const startTimer = () => {
    // Clear any timers already running
    intervalRef.current = setInterval(() => setTrackProgress(audioRef.current.currentTime), 1000);
  };

  const onScrub = (value: number) => {
    audioRef.current.currentTime = value;
    setTrackProgress(audioRef.current.currentTime);
  };

  const onScrubEnd = () => {
    // If not already playing, start
    if (!isPlaying) {
      setIsPlaying(true);
    }
    startTimer();
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      startTimer();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    // Pause and clean up on unmount
    return () => {
      audioRef.current.pause();
    };
  }, []);

  return (
      <>
      <AudioControls 
        isPlaying={isPlaying}
        onPlayPauseClick={setIsPlaying}
      />
      <input
          type="range"
          value={trackProgress}
          step="1"
          min="0"
          max={duration ? duration : `${duration}`}
          className="progress"
          onChange={(e) => onScrub(parseInt(e.target.value))}
          onMouseUp={onScrubEnd}
          onKeyUp={onScrubEnd}
          style={{ background: trackStyling }}
        />
      </>
      
  )
}

export default AudioPlayer