/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import ProgressBar from './ProgressBar';

function Timer() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [displayMessage, setDisplayMessage] = useState(false);
  const [start, setStart] = useState(false);
  const [x, setX] = useState(1); // X = Cycle number
  const [background, setBackground] = useState('#D8564F');
  const [color, setColor] = useState('red');

  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

  useEffect(() => {
    document.body.style.background = background;
  }, [background]);

  useEffect(() => {
    if (x === 1) {
      setMinutes(25);
      setSeconds(0);
      setBackground('#D8564F');
      setColor('red');
    } else if (x === 2) {
      // Break
      setStart(false);
      setMinutes(5);
      setSeconds(0);
      setBackground('#4C9095');
      setColor('green');
    } else if (x === 3) {
      setStart(false);
      setMinutes(25);
      setSeconds(0);
      setBackground('#D8564F');
      setColor('red');
    } else if (x === 4) {
      // Break
      setStart(false);
      setMinutes(5);
      setSeconds(0);
      setBackground('#4C9095');
      setColor('green');
    } else if (x === 5) {
      setStart(false);
      setMinutes(25);
      setSeconds(0);
      setBackground('#D8564F');
      setColor('red');
    } else if (x === 6) {
      // Long Break
      setStart(false);
      setMinutes(15);
      setSeconds(0);
      setBackground('#4C9095');
      setColor('green');
    } else if (x === 7) {
      // Repeat Cycle
      setStart(false);
      setX(1);
    }
  }, [x]);

  useEffect(() => {
    const interval = setInterval(() => {
      clearInterval(interval);

      if (start === false) {
        clearInterval(interval);
      } else if (seconds === 0) {
        if (minutes !== 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          setStart(!start);
          setX(x + 1);
          setDisplayMessage(!displayMessage);
        }
      } else {
        setSeconds(seconds - 1);
      }
    }, 1000);
  }, [seconds, start]);

  // Stop timer
  const stop = () => {
    setStart(false);
  };

  // Start timer
  const startTimer = () => {
    setStart(true);
  };

  // Skip
  const skip = () => {
    setStart(false);
    setTimeout(() => {
      setX(x + 1);
    }, 1000);
  };

  return (
    <div className="pomodoro">
      <div className="timer-box">
        <div className="timer">
          {timerMinutes}
          :
          {timerSeconds}
        </div>
        <div className="button">
          {start
            ? <button type="button" className={color} onClick={stop}>STOP</button>
            : <button type="button" className={color} onClick={startTimer}>START</button>}
          <div className={`skip ${color}`} onClick={skip}>&gt;</div>
        </div>
      </div>
      <div className="progress_box">

        <ProgressBar x={x} minutes={minutes} seconds={seconds} />
      </div>
      {displayMessage && <div>Break time! You can start your next session in: </div>}
    </div>
  );
}

export default Timer;
