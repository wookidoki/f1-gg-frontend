import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const CountdownWrapper = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 1.5rem;

  @media (max-width: 768px) {
    gap: 8px;
  }
`;

const TimeBlock = styled.div`
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);
  border-radius: 12px;
  padding: 12px 16px;
  text-align: center;
  min-width: 70px;

  @media (max-width: 768px) {
    padding: 10px 12px;
    min-width: 55px;
  }

  .value {
    font-size: 2rem;
    font-weight: 900;
    font-style: italic;
    line-height: 1;

    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }

  .label {
    font-size: 0.7rem;
    font-weight: 600;
    opacity: 0.8;
    margin-top: 4px;
    text-transform: uppercase;
  }
`;

const Countdown = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (!targetDate) return;

    const calculateTimeLeft = () => {
      const now = new Date();
      const target = new Date(targetDate);
      const diff = target - now;

      if (diff <= 0) {
        setIsExpired(true);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000)
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (isExpired) {
    return null;
  }

  const pad = (num) => String(num).padStart(2, '0');

  return (
    <CountdownWrapper>
      <TimeBlock>
        <div className="value">{pad(timeLeft.days)}</div>
        <div className="label">Days</div>
      </TimeBlock>
      <TimeBlock>
        <div className="value">{pad(timeLeft.hours)}</div>
        <div className="label">Hours</div>
      </TimeBlock>
      <TimeBlock>
        <div className="value">{pad(timeLeft.minutes)}</div>
        <div className="label">Mins</div>
      </TimeBlock>
      <TimeBlock>
        <div className="value">{pad(timeLeft.seconds)}</div>
        <div className="label">Secs</div>
      </TimeBlock>
    </CountdownWrapper>
  );
};

export default Countdown;
