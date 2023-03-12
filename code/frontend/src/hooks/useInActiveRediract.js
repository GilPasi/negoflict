import { useState, useEffect, useRef } from 'react';

const useInactivityRedirect = (inactiveTime = 900000, redirectUrl = '/login') => {
  const [isActive, setIsActive] = useState(true);
  const timerRef = useRef(null);

  useEffect(() => {
    const resetTimer = () => {
      setIsActive(true);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        window.location.href = redirectUrl;
      }, inactiveTime);
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    window.addEventListener('scroll', resetTimer);

    return () => {
      clearTimeout(timerRef.current);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      window.removeEventListener('scroll', resetTimer);
    };
  }, [inactiveTime, redirectUrl]);

  return isActive;
};

export default useInactivityRedirect;
