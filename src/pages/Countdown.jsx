import { useEffect, useRef, useState } from 'react';

const Countdown = () => {
  const [started, setStarted] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(3);
  const [showImage, setShowImage] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (!started || showImage) return;

    if (secondsLeft > 1) {
      const timer = setTimeout(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (secondsLeft === 1) {
      setTimeout(() => setAnimateOut(true), 200);
      const timer = setTimeout(() => {
        setShowImage(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [secondsLeft, started, showImage]);

  useEffect(() => {
    if (showImage && audioRef.current) {
      audioRef.current.play().catch((e) => {
        console.log('Audio play failed:', e);
      });
    }
  }, [showImage]);

  const handleStart = () => setStarted(true);

  // Generate 10 balloons with random animation delays and horizontal positions
  const renderBalloons = () => {
    return Array.from({ length: 10 }).map((_, i) => {
      const left = Math.random() * 90 + 5; // 5% to 95% left
      const delay = Math.random() * 5; // 0s to 5s delay
      const color = ['#ffd700', '#87ceeb', '#98fb98', '#0000FF'][i % 5]; // color loop

      return (
        <div
          key={i}
          className="balloon"
          style={{
            left: `${left}%`,
            backgroundColor: color,
            animationDuration: `${5 + Math.random() * 5}s`,
            animationDelay: `${delay}s`,
          }}
        ></div>
      );
    });
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-white text-center overflow-hidden">
      {!started ? (
        <button
          onClick={handleStart}
          className="text-3xl font-extrabold text-pink-400 bg-white/10 px-10 py-6 rounded-2xl shadow-xl hover:bg-white/20 transition duration-300"
        >
          Tap to Start
        </button>
      ) : !showImage ? (
        <p
          className={`font-extrabold select-none transition-transform duration-700 ease-in-out ${
            animateOut ? 'opacity-0 scale-50' : 'opacity-100 scale-100'
          }`}
          style={{
            fontSize: '50vh',
            lineHeight: '50vh',
            margin: 0,
            userSelect: 'none',
          }}
        >
          {secondsLeft}
        </p>
      ) : (
        <>
          <audio ref={audioRef} src="/hbd.mp3" loop />
          {renderBalloons()}
          <img
            src="/donwithbike.jpg"
            alt="Don with Bike"
            className="object-cover rounded-xl z-20"
            style={{
              width: '80vw',
              maxHeight: '80vh',
              objectFit: 'cover',
            }}
          />
          <h1 className="text-4xl font-extrabold text-pink-500 drop-shadow-lg mt-6 z-20"
          style={{ fontFamily: "'Pacifico', cursive" }}>
            Happy Birthday!
          </h1>
        </>
      )}
    </div>
  );
};

export default Countdown;
