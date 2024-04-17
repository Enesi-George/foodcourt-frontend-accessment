import { useState, useEffect } from 'react';

export const Introduction = () => {
  const [typedText, setTypedText] = useState('');
  const staticText = 'Frontend Assessment On ';

  useEffect(() => {
    const password = 'Password Validation';

    let currentIndex = 0;
    let intervalId;

    const startTyping = () => {
      intervalId = setInterval(() => {
        if (currentIndex <= password.length) {
          setTypedText(password.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(intervalId);
          setTimeout(() => {
            currentIndex = 0;
            setTypedText('');
            startTyping();
          }, 5000); 
        }
      }, 150);
    };

    startTyping();

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className=''>
      <h1 className='font-bold text-white text-base md:text-3xl w-full'>
        {staticText}
        <span className=' underline text-blue-950'>{typedText}</span>
      </h1>
    </div>
  );
};
