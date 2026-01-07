import React, { useState, useEffect, useRef } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';
import { motion } from 'framer-motion';

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const playerRef = useRef(null);

    useEffect(() => {
        // Load YouTube IFrame API
        if (!window.YT) {
            const tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }

        // Initialize player when API is ready
        window.onYouTubeIframeAPIReady = () => {
            playerRef.current = new window.YT.Player('youtube-player', {
                height: '0',
                width: '0',
                videoId: 'xAF0vbdcCIc', // Requested Video ID
                playerVars: {
                    'playsinline': 1,
                    'controls': 0,
                    'disablekb': 1,
                    'fs': 0,
                    'loop': 1,
                    'playlist': 'xAF0vbdcCIc' // Required for loop to work
                },
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                }
            });
        };

        // If API is already loaded (e.g. on navigation), initialize manually
        if (window.YT && window.YT.Player) {
            playerRef.current = new window.YT.Player('youtube-player', {
                height: '0',
                width: '0',
                videoId: 'xAF0vbdcCIc',
                playerVars: {
                    'playsinline': 1,
                    'controls': 0,
                    'disablekb': 1,
                    'fs': 0,
                    'loop': 1,
                    'playlist': 'xAF0vbdcCIc'
                },
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                }
            });
        }

        return () => {
            // Cleanup not strictly necessary for a global singleton-like player, 
            // but good practice if unmounting. 
            // However, we want music to persist, so we might leave it.
            // For this specific app structure, MusicPlayer is in App.jsx so it stays mounted.
        };
    }, []);

    const onPlayerReady = (event) => {
        setIsReady(true);
        event.target.setVolume(50); // Set reasonable default volume
    };

    const onPlayerStateChange = (event) => {
        if (event.data === window.YT.PlayerState.PLAYING) setIsPlaying(true);
        if (event.data === window.YT.PlayerState.PAUSED) setIsPlaying(false);
        if (event.data === window.YT.PlayerState.ENDED) {
            // Loop handled by playlist var, but fallback:
            playerRef.current.playVideo();
        }
    };

    const togglePlay = () => {
        if (!isReady || !playerRef.current) return;

        if (isPlaying) {
            playerRef.current.pauseVideo();
        } else {
            playerRef.current.playVideo();
        }
    };

    return (
        <div className="fixed bottom-8 right-8 z-50">
            {/* Hidden YouTube Player Container */}
            <div id="youtube-player" className="hidden"></div>

            <div className="relative flex items-center gap-4">
                {/* Text Label */}
                <div className="text-white/80 text-xs md:text-sm italic font-light tracking-wider whitespace-nowrap hidden md:block">
                    {isPlaying ? "Playing background music..." : "Wanna play music while scrolling?"}
                </div>

                <motion.button
                    onClick={togglePlay}
                    disabled={!isReady}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white shadow-lg shadow-teal-500/20 transition-all duration-300 ${isPlaying ? 'bg-teal-500 animate-pulse-slow' : 'bg-gray-800 hover:bg-gray-700'} ${!isReady ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {isPlaying ? <FaPause className="text-lg md:text-xl" /> : <FaPlay className="text-lg md:text-xl ml-1" />}
                </motion.button>
            </div>

            <style>{`
        @keyframes pulse-slow {
            0%, 100% { box-shadow: 0 0 0 0px rgba(20, 184, 166, 0.7); }
            50% { box-shadow: 0 0 0 10px rgba(20, 184, 166, 0); }
        }
        .animate-pulse-slow {
            animation: pulse-slow 2s infinite;
        }
      `}</style>
        </div>
    );
};

export default MusicPlayer;
