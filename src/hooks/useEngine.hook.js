import { useEffect, useState } from 'react';

const isKeyboardCodeAllowed = code => {
  console.log(code);
  return (
    code.startsWith('Key') ||
    code.startsWith('Digit') ||
    code.startsWith('Bracket') ||
    code === 'Backspace' ||
    code === 'Semicolon' ||
    code === 'Period' ||
    code === 'Quote' ||
    code === 'Comma' ||
    code === 'Slash' ||
    code === 'Equal' ||
    code === 'Minus' ||
    code === 'Space' ||
    code === 'Enter'
  );
};

export const useEngine = () => {
  const [typed, setTyped] = useState('');

  useEffect(() => {
    window.addEventListener('keydown', keydownHandler);
    return () => {
      window.removeEventListener('keydown', keydownHandler);
    };
  }, []);

  const keydownHandler = ({ key, code }) => {
    if (!isKeyboardCodeAllowed(code)) {
      return;
    }

    switch (key) {
      case 'Backspace':
        setTyped(prev => prev.slice(0, -1));
        break;
      case 'Enter':
        setTyped(prev => prev.concat('\n'));
        break;
      default:
        setTyped(prev => prev.concat(key));
    }
  };

  return { typed };
};
