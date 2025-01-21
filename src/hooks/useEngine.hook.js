import { useEffect, useRef, useState } from 'react';

const isKeyboardCodeAllowed = code => {
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
  // const words =
  //   'const debounce = (func, delay) => {\n\tlet timeout;\n\treturn (...args) => {\n\t\tclearTimeout(timeout);\n\t\ttimeout = setTimeout(() => func(...args), delay);\n\t};\n};';
  // const words = '// -- Finish --\n\n// Press Tab to reset exercise';
  const words =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla';
  const [typed, setTyped] = useState('');
  const totalTyped = useRef(0);

  useEffect(() => {
    window.addEventListener('keydown', handlerKeydown);
    return () => {
      window.removeEventListener('keydown', handlerKeydown);
    };
  }, []);

  const handlerKeydown = e => {
    e.preventDefault();

    const { key, code } = e;
    if (!isKeyboardCodeAllowed(code)) return;

    switch (key) {
      case 'Backspace':
        setTyped(prev => prev.slice(0, -1));
        totalTyped.current -= 1;
        while (words[totalTyped.current] === '\t') {
          setTyped(prev => prev.slice(0, -1));
          totalTyped.current -= 1;
        }
        break;
      case 'Enter':
        setTyped(prev => prev.concat('\n'));
        totalTyped.current += 1;
        break;
      default:
        setTyped(prev => prev.concat(key));
        totalTyped.current += 1;
    }

    if (key !== 'Backspace') {
      while (words[totalTyped.current] === '\t') {
        setTyped(prev => prev.concat('\t'));
        totalTyped.current += 1;
      }
    }
  };

  return { words, typed, totalTyped: totalTyped.current };
};
