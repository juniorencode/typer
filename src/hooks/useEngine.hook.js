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
    code === 'Enter' ||
    code === 'Tab'
  );
};

export const useEngine = () => {
  const [words, setWords] = useState(
    'const debounce = (func, delay) => {\n\tlet timeout;\n\treturn (...args) => {\n\t\tclearTimeout(timeout);\n\t\ttimeout = setTimeout(() => func(...args), delay);\n\t};\n};'
  );
  // const [words, setWords] = useState('Lorem');
  const [state, setState] = useState('start');
  const [typed, setTyped] = useState('');
  const totalTyped = useRef(0);
  const [time, setTime] = useState(0);
  const interval = useRef(null);

  useEffect(() => {
    window.addEventListener('keydown', handlerKeydown);
    return () => {
      window.removeEventListener('keydown', handlerKeydown);
    };
    // eslint-disable-next-line
  }, [state]);

  const handlerKeydown = e => {
    e.preventDefault();
    const { key, code } = e;

    if (!isKeyboardCodeAllowed(code)) return;
    if (state === 'start') {
      setState('run');
      setTyped('');
      totalTyped.current = 0;
      interval.current = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
    }
    if (key === 'Tab') {
      if (state === 'finish') {
        setState('start');
        setWords(
          'const debounce = (func, delay) => {\n\tlet timeout;\n\treturn (...args) => {\n\t\tclearTimeout(timeout);\n\t\ttimeout = setTimeout(() => func(...args), delay);\n\t};\n};'
        );
        setTime(0);
        return;
      }
    } else {
      if (state === 'finish') return;

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

      if (state === 'run' && totalTyped.current === words.length) {
        setState('finish');
        setWords('// -- Finish --\n\n// Press Tab to reset exercise');
        clearInterval(interval.current);
      }
    }
  };

  return { state, time, words, typed, totalTyped: totalTyped.current };
};
