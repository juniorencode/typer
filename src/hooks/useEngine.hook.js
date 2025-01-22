import { useEffect, useRef, useState } from 'react';
import { calculateWPM } from '../utilities/utils.utilities';

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
  const [time, setTime] = useState(0);
  const [errors, setErrors] = useState(0);
  const [corrects, setCorrects] = useState(0);
  const [typed, setTyped] = useState('');
  const totalTyped = useRef(0);
  const interval = useRef(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    window.addEventListener('keydown', handlerKeydown);
    return () => {
      window.removeEventListener('keydown', handlerKeydown);
    };
    // eslint-disable-next-line
  }, [state, typed]);

  const handlerKeydown = e => {
    e.preventDefault();
    const { key, code } = e;

    if (!isKeyboardCodeAllowed(code)) return;
    if (state === 'start') {
      setState('run');
      interval.current = setInterval(() => {
        setHistory(prev => {
          const _time = (prev[prev.length - 1]?.time || 0) + 1;
          return [
            ...prev,
            {
              time: _time,
              value: calculateWPM(totalTyped.current, _time)
            }
          ];
        });
        setTime(prev => prev + 1);
      }, 1000);
    }
    if (key === 'Tab') {
      if (state === 'finish') {
        setState('start');
        setCorrects(0);
        setErrors(0);
        setTyped('');
        totalTyped.current = 0;
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
          if (totalTyped.current > 0) {
            // const lastTypedChar = typed[totalTyped.current - 1];
            // const correctChar = words[totalTyped.current - 1];
            // if (lastTypedChar !== correctChar) {
            //   setErrors(prev => Math.max(prev - 1, 0));
            // }
            setTyped(prev => prev.slice(0, -1));
            totalTyped.current -= 1;

            while (
              words[totalTyped.current] === '\t' &&
              totalTyped.current > 0
            ) {
              setTyped(prev => prev.slice(0, -1));
              totalTyped.current -= 1;
            }
          }
          break;
        case 'Enter':
          if (words[totalTyped.current] !== '\n') setErrors(prev => prev + 1);
          setTyped(prev => prev.concat('\n'));
          totalTyped.current += 1;
          break;
        default:
          if (words[totalTyped.current] !== key) setErrors(prev => prev + 1);
          setTyped(prev => prev.concat(key));
          totalTyped.current += 1;
      }

      if (key !== 'Backspace') {
        while (words[totalTyped.current] === '\t') {
          setTyped(prev => prev.concat('\t'));
          totalTyped.current += 1;
        }
      }

      let _corrects = 0;
      for (let i = 0; i < typed.length; i++) {
        if (words[i] === typed[i]) {
          _corrects++;
        }
      }
      setCorrects(_corrects);

      if (state === 'run' && totalTyped.current === words.length) {
        setState('finish');
        setWords('// -- Finish --\n\n// Press Tab to reset exercise');
        clearInterval(interval.current);
      }
    }
  };

  return {
    state,
    time,
    corrects,
    errors,
    words,
    typed,
    totalTyped: totalTyped.current,
    history
  };
};
