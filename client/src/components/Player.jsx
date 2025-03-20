import { Heart, Play, Pause, SkipBack, SkipForward } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

const Player = ({ isPlaying, setIsPlaying, song, setCurrentSong, nextSong }) => {
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [loading, setLoading] = useState(true);
  const audioRef = useRef(new Audio());
  const skipRef = useRef()
  useEffect(() => {
    const audio = audioRef.current;
    audio.src = song.musicUrl;
    setLoading(true);

    const playAudio = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
        setLoading(false);
      } catch (error) {
        console.error("Error playing audio", error);
      }
    };

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    const setAudioData = () => {
      setDuration(audio.duration);
      setLoading(false);
    };

    audio.addEventListener("loadedmetadata", setAudioData);
    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("canplay", playAudio);

    return () => {
      audio.pause();
      audio.removeEventListener("loadedmetadata", setAudioData);
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("canplay", playAudio);
    };
  }, [song]);


  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const newTime = (e.target.value / 100) * duration;
    audioRef.current.currentTime = newTime;
    setProgress(e.target.value);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  useEffect(() => {
    if(formatTime(currentTime) ==  formatTime(duration)){
      setCurrentSong(nextSong)
    }
  }, [currentTime])
  return (
    <div className="fixed bottom-0 w-full bg-base-300 text-white py-3 px-3 flex flex-col items-center shadow-lg">
      
        <>
          <div className="w-full max-w-xl flex items-center space-x-3">
            <span className="text-xs text-gray-400">{formatTime(currentTime)}</span>
            <div className="relative w-full h-1 bg-gray-700 rounded-full">
              <div
                className="absolute top-0 left-0 h-full bg-blue-500 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                className="absolute top-1/2 -translate-y-1/2 w-full h-1 opacity-0 cursor-pointer"
                onChange={handleSeek}
              />
            </div>
            <span className="text-xs text-gray-400">{formatTime(duration)}</span>
          </div>

          <div className="w-full flex justify-between items-center mt-3 ">
            <div className="flex items-center space-x-3">
              <img
                src={song.coverUrl}
                alt="Album Art"
                className="rounded-md w-12 h-12 object-cover"
              />
              <div>
                <h4 className="text-sm font-semibold">{song.title}</h4>
                <p className="text-xs text-gray-400">{song.artist}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button className="text-gray-400 hover:text-white">
                <SkipBack size={22} onClick={() => (audioRef.current.currentTime = 0)} />
              </button>
              <button
                className="p-3 bg-blue-500 text-white rounded-full hover:scale-110 transition"
                onClick={togglePlayPause}
              >
                {isPlaying ? <Pause size={22} /> : <Play size={22} />}
              </button>
              <button className="text-gray-400 hover:text-white">
                <SkipForward ref={skipRef} size={22} onClick={() => setCurrentSong(nextSong)} />
              </button>
            </div>

            <button className="text-gray-400 hover:text-white ml-5">
              {/* <Heart size={22} /> */}
            </button>
          </div>
        </>
    </div>
  );
};

export default Player;
