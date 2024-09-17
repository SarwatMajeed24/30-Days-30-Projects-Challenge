"use client"; // Enables client-side rendering for this component

import { useState, useRef, useEffect, ChangeEvent } from "react"; // Import React hooks and types
import { Input } from "@/components/ui/input"; // Import custom Input component
import { Button } from "@/components/ui/button"; // Import custom Button component

export default function Countdown() {
  const [duration, setDuration] = useState<number | string>("");
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleSetDuration = (): void => {
    if (typeof duration === "number" && duration > 0) {
      setTimeLeft(duration); 
      setIsActive(false); 
      setIsPaused(false); 
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const handleStart = (): void => {
    if (timeLeft > 0) {
      setIsActive(true); 
      setIsPaused(false); 
    }
  };

  const handlePause = (): void => {
    if (isActive) {
      setIsPaused(true); 
      setIsActive(false); 
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const handleStop = (): void => {
    setIsActive(false);
    setIsPaused(false); 
    setTimeLeft(0);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const handleReset = (): void => {
    setIsActive(false);
    setIsPaused(false); 
    setTimeLeft(typeof duration === "number" ? duration : 0);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const handleDelete = (): void => {
    setIsActive(false);
    setIsPaused(false); 
    setTimeLeft(0);
    setDuration(""); // Clear the duration input
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  useEffect(() => {
    if (isActive && !isPaused) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current!);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000); 
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isActive, isPaused]); 

  const formatTime = (time: number): string => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  const handleDurationChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setDuration(Number(e.target.value) || ""); 
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500">
      {/* Timer container */}
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-yellow-100 shadow-lg rounded-full p-20 w-auto max-w-lg border border-gray-300 text-center">
          <h1 className="text-4xl font-extrabold mb-6 text-red-800">
            Countdown Timer
          </h1>
          <div className="flex items-center mb-6">
            <Input
              type="number"
              id="duration"
              placeholder="Enter duration in seconds"
              value={duration}
              onChange={handleDurationChange}
              className="flex-1 mr-4 rounded-md border-gray-300 bg-gray-100 text-gray-900"
            />
            <Button
              onClick={handleSetDuration}
              variant="default"
              className="bg-green-500 text-black font-bold hover:bg-green-600"
            >
              Set
            </Button>
          </div>
          <div className="text-5xl font-bold text-blue-900 mb-8">
            {formatTime(timeLeft)}
          </div>
        
          {/* Button container */}
          <div className="flex-1 flex items-center justify-center">
          <div className="w-48 bg-amber-800 shadow-lg rounded-lg p-4 border border-gray-300">
            <div className="flex flex-col gap-4">
              <Button
                onClick={handleStart}
                variant="default"
                className="bg-blue-500 text-black font-bold hover:bg-blue-600"
              >
                {isPaused ? "Resume" : "Start"}
              </Button>
              <Button
                onClick={handlePause}
                variant="default"
                className="bg-yellow-500 text-black font-bold hover:bg-yellow-600"
              >
                Pause
              </Button>
              <Button
                onClick={handleStop} // Added Stop Button
                variant="default"
                className="bg-gray-500 text-black font-bold hover:bg-gray-600"
              >
                Stop
              </Button>
              <Button
                onClick={handleReset}
                variant="default"
                className="bg-red-500 text-black font-bold hover:bg-red-600"
              >
                Reset
              </Button>
              <Button
                onClick={handleDelete}
                variant="default"
                className="bg-violet-400 text-black font-bold hover:bg-red-600"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}
