'use client'; // Enables client-side rendering for this component

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { FaBirthdayCake, FaGift } from 'react-icons/fa';
import { IoBalloonSharp } from "react-icons/io5";

type ConfettiProps = {
  width: number;
  height: number;
};

const DynamicConfetti = dynamic(() => import('react-confetti'), { ssr: false });

// Updated bright colors for candles and balloons
const candleColors = ['#FF5733', '#FFC300', '#DAF7A6', '#C70039', '#FF33A8']; // Changed last color
const balloonColors = ['#FF5733', '#33FF57', '#5733FF', '#FFC300', '#FF33A8']; // Changed last color
const cardColors = ['#FFEB3B', '#FF9800', '#FF5722', '#4CAF50', '#92A8D1']; // New colors for card
const confettiColors = ['#FF5733', '#FFC300', '#DAF7A6', '#C70039', '#900C3F', '#FF33A8', '#33A8FF'];

export default function BirthdayWish() {
  const [candlesLit, setCandlesLit] = useState<number>(0);
  const [balloonsPoppedCount, setBalloonsPoppedCount] = useState<number>(0);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [windowSize, setWindowSize] = useState<ConfettiProps>({ width: 0, height: 0 });
  const [celebrating, setCelebrating] = useState<boolean>(false);

  // State for background color
  const [backgroundColor, setBackgroundColor] = useState<string>('white');

  // State for cake color
  const [cakeColor, setCakeColor] = useState<string>('black'); // Default cake color

  // State for card color
  const [cardColor, setCardColor] = useState<string>('white'); // Default card color

  const totalCandles: number = 5;
  const totalBalloons: number = 5;

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Change the cake color based on the number of candles and balloons
    const newCakeColor = `hsl(${(candlesLit + balloonsPoppedCount) * 30}, 100%, 50%)`;
    setCakeColor(newCakeColor); // Update the cake color

    // Show confetti if all candles are lit
    if (candlesLit === totalCandles) {
      setShowConfetti(true);
      setCelebrating(false); // Celebration finished
    }
  }, [candlesLit, balloonsPoppedCount]);

  const lightCandle = (index: number) => {
    if (index === candlesLit && !celebrating) { // Prevent multiple triggering
      setCandlesLit((prev) => prev + 1);
      setBackgroundColor(candleColors[index % candleColors.length]); // Update background color
      setCardColor(cardColors[index % cardColors.length]); // Update card color
    }
  };

  const popBalloon = (index: number) => {
    if (index === balloonsPoppedCount && !celebrating) { // Prevent multiple triggering
      setBalloonsPoppedCount((prev) => prev + 1);
      setBackgroundColor(balloonColors[index % balloonColors.length]); // Update background color
      setCardColor(cardColors[index % cardColors.length]); // Update card color
    }
  };

  const celebrate = () => {
    setCelebrating(true);

    // Start lighting candles one by one
    const candleInterval = setInterval(() => {
      setCandlesLit((prev) => {
        if (prev < totalCandles) {
          const newCandleIndex = prev; // Current index to light
          setBackgroundColor(candleColors[newCandleIndex % candleColors.length]); // Change background color
          setCardColor(cardColors[newCandleIndex % cardColors.length]); // Change card color
          return prev + 1;
        }
        clearInterval(candleInterval);
        return prev;
      });
    }, 1000); // Light one candle every second
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-4" style={{ backgroundColor }}>
      {/* Heading section at the top of the page */}
      <header className="w-full text-center mb-8 flex flex-col items-center">
        <h1 className="text-8xl font-extrabold text-black font-serif mb-2">Happy Birthday to me!</h1>
        <h2 className="text-5xl font-semibold text-red-700">Sarwat Majeed</h2>
        <p className="text-4xl text-blue-700">13th October</p>
      </header>

      {/* Centered and resized card */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl h-[700px] flex items-center justify-center"
      >
        <Card className="border-2 border-black shadow-md relative h-100 w-full p-1" style={{ backgroundColor: cardColor }}>
          {/* Balloons inside the card on the left and right */}
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <div className="flex flex-col space-y-2">
              {[...Array(totalBalloons)].map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 1 }}
                  animate={{ scale: index < balloonsPoppedCount ? 0 : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <IoBalloonSharp 
                    className={`w-12 h-12 cursor-pointer hover:scale-110`}
                    style={{ color: index < balloonsPoppedCount ? '#D1D5DB' : balloonColors[index % balloonColors.length] }}
                    onClick={() => popBalloon(index)}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <div className="flex flex-col space-y-2">
              {[...Array(totalBalloons)].map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 1 }}
                  animate={{ scale: index < balloonsPoppedCount ? 0 : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <IoBalloonSharp 
                    className={`w-12 h-12 cursor-pointer hover:scale-110`}
                    style={{ color: index < balloonsPoppedCount ? '#D1D5DB' : balloonColors[index % balloonColors.length] }}
                    onClick={() => popBalloon(index)}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          <CardContent className="space-y-6 text-center flex flex-col items-center justify-center">
            {/* Big cake icon in the center with dynamic color */}
            <div className="flex justify-center items-center mb-4">
              <FaBirthdayCake className="w-48 h-48" style={{ color: cakeColor }} />
            </div>

            {/* Candles section */}
            <div>
              <h3 className="text-lg font-semibold text-black mb-2">Light the candles:</h3>
              <div className="flex justify-center space-x-2">
                {[...Array(totalCandles)].map((_, index) => (
                  <AnimatePresence key={index}>
                    {(celebrating && index <= candlesLit) || (!celebrating && index < candlesLit) ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ duration: 0.5, delay: celebrating ? index * 0.5 : 0 }}
                      >
                        <FaBirthdayCake
                          className={`w-10 h-10 transition-colors duration-300 ease-in-out cursor-pointer hover:scale-110`}
                          style={{ color: candleColors[index % candleColors.length] }}
                          onClick={() => lightCandle(index)}
                        />
                      </motion.div>
                    ) : (
                      <FaBirthdayCake
                        className={`w-10 h-10 text-gray-300 transition-colors duration-300 ease-in-out cursor-pointer hover:scale-110`}
                        onClick={() => lightCandle(index)}
                      />
                    )}
                  </AnimatePresence>
                ))}
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-center mt-6">
            <Button
              className="bg-black text-white hover:bg-gray-800 transition-all duration-300"
              onClick={celebrate}
              disabled={celebrating}
            >
              Celebrate! <FaGift className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </motion.div>

      {/* Confetti */}
      {showConfetti && (
        <DynamicConfetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
          colors={confettiColors}
        />
      )}
    </div>
  );
}
