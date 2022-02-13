import React from "react";
import ButtonGroup from '@mui/material/ButtonGroup'
import IconButton from '@mui/material/IconButton'
import PlayArrow from '@mui/icons-material/PlayArrow'
import Pause from '@mui/icons-material/Pause'

interface controls {
    isPlaying: boolean,
    onPlayPauseClick: React.Dispatch<React.SetStateAction<boolean>>
}

const AudioControls = ({
  isPlaying,
  onPlayPauseClick
}: controls) => (
  <ButtonGroup variant="text">

      <IconButton aria-label="play" onClick={() => isPlaying ? onPlayPauseClick(false): onPlayPauseClick(true)}>
          {isPlaying ? <Pause /> : <PlayArrow />} 
      </IconButton>

  </ButtonGroup>
);

export default AudioControls;