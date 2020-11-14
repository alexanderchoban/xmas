import React, { useState, useEffect, useContext } from "react"
import { Typography, Grid, Button, LinearProgress } from "@material-ui/core"
import { AudioContext } from "../provider"

const formatTime = seconds =>
  `${Math.floor(seconds / 60)}:${(Math.floor(seconds % 60) + "").padStart(
    2,
    "0"
  )}`

const Player = () => {
  const [date, setDate] = useState()
  const context = useContext(AudioContext)
  const audio = context && context.audio ? context.audio : null

  useEffect(() => {
    if (audio && !audio.readyState) {
      fetch("api/play")
        .then(response => {
          if (!response.ok) {
            throw new Error("Network response was not ok")
          }
          return response.blob()
        })
        .then(myBlob => {
          audio.pause()
          audio.setAttribute("src", URL.createObjectURL(myBlob))
          audio.load()
        })
        .catch(error => {
          console.error(
            "There has been a problem with your fetch operation:",
            error
          )
        })
    }

    const interval = setInterval(() => setDate(Date.now()), 1000)
    return () => clearInterval(interval)
  }, [audio])

  const syncAudio = async () => {
    if (audio) {
      const response = await fetch("/api/play/time")
      const { currentPlaytime, serverTime } = await response.json()
      audio.currentTime = currentPlaytime
      console.debug("time diff", date - serverTime)
      audio.play()
    }
  }

  const stopAudio = () => {
    if (audio) audio.pause()
  }

  if (audio && audio.readyState && audio.currentTime === audio.duration) {
    syncAudio()
  }

  return (
    <div>
      <Typography>
        Use the controls below to play music that syncs with the light show.
      </Typography>

      <LinearProgress
        variant="determinate"
        value={
          audio ? Math.floor((audio.currentTime / audio.duration) * 100) : 0
        }
      />
      {audio && (
        <Grid container>
          <Grid item xs={6}>
            {formatTime(audio.currentTime)}
          </Grid>
          <Grid item align="right" xs={6}>
            {formatTime(audio.duration)}
          </Grid>
        </Grid>
      )}

      <Button
        color="primary"
        variant="contained"
        size="large"
        disabled={!audio}
        onClick={syncAudio}
      >
        {audio ? "Play" : "Loading..."}
      </Button>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        disabled={!audio}
        onClick={stopAudio}
      >
        Stop
      </Button>
    </div>
  )
}

export default Player
