import { useState, useRef } from 'react';
import './Stopwatch.css';

function Stopwatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null); 

  const startStopwatch = () => {
    if (!isRunning) {
      timerRef.current = setTimeout(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1000);
        startStopwatch(); 
      }, 1000); 
    }
    setIsRunning(true);
  };

  const stopStopwatch = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setIsRunning(false);
  };

  const resetTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setElapsedTime(0);
    setIsRunning(false);
  };

  return (
    <div className='stopwatch'>
        <h3>Timer</h3>
        <p>
        {Math.floor(elapsedTime / 60000)} minutes {Math.floor((elapsedTime % 60000) / 1000)} seconds
      </p>
      <div className='buttons'>
      <button onClick={startStopwatch} className={`timerBtn ${isRunning ? 'disabled' : ''}`}>
        Start
      </button>
      <button onClick={stopStopwatch}className={`timerBtn ${!isRunning ? 'disabled' : ''}`}>
        Stop
      </button>
      <button onClick={resetTimer} className='timerBtn'>Reset</button>
      </div>
    </div>
  );
}

export default Stopwatch;
