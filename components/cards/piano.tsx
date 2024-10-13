"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const PianoVisualization: React.FC = () => {
  const [audioData, setAudioData] = useState<number[]>(Array(30).fill(100)); // Initial heights
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const animationIdRef = useRef<number | null>(null);

  const setupAudio = () => {
    if (audioContextRef.current) return; // Prevent multiple AudioContexts

    audioContextRef.current = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    const audio = audioElementRef.current!;

    // Create a MediaElementSource from the audio element
    sourceRef.current = audioContextRef.current.createMediaElementSource(audio);

    // Create an AnalyserNode
    analyserRef.current = audioContextRef.current.createAnalyser();
    analyserRef.current.fftSize = 64; // Smaller FFT for lower frequencies

    // Connect audio source to analyser and destination
    sourceRef.current.connect(analyserRef.current);
    analyserRef.current.connect(audioContextRef.current.destination);

    // Create a buffer array to store the audio data
    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);

    // Function to update the audio data and animate
    const updateAudioData = () => {
      analyserRef.current!.getByteFrequencyData(dataArray);

      // Map the dataArray to fit the number of bars (30 bars)
      const normalizedData = Array.from(dataArray)
        .slice(0, 30)
        .map((val) => {
          return (val / 255) * 200 + 100; // Normalize to fit the height (100px to 300px)
        });

      setAudioData(normalizedData); // Update the height values

      // Request the next animation frame
      animationIdRef.current = requestAnimationFrame(updateAudioData);
    };

    // Start updating the audio data
    animationIdRef.current = requestAnimationFrame(updateAudioData);
  };

  useEffect(() => {
    // Clean up on unmount
    return () => {
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
      if (audioContextRef.current) {
        // Disconnect and close audio context to prevent memory leaks
        if (sourceRef.current) {
          sourceRef.current.disconnect();
        }
        audioContextRef.current.close();
      }
    };
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <audio
        ref={audioElementRef}
        src="/music/audio2.mp3"
        onPlay={setupAudio}
        controls
        className="mb-20"
        // autoPlay
      />

      <div className="flex items-end h-60">
        {audioData.map((height, index) => (
          <motion.div
            key={index}
            className="bg-gray-400 w-2 mx-0.5 rounded-2xl"
            animate={{
              height: `${height}px`, // Dynamic height based on the audio data
              backgroundColor: height > 200 ? "#3B82F6" : "#6B7280", // Change color based on intensity
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default PianoVisualization;
