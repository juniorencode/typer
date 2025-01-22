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
  const [state, setState] = useState('start');
  const [time, setTime] = useState(0);
  const [errors, setErrors] = useState(0);
  const [corrects, setCorrects] = useState(0);
  const [typed, setTyped] = useState('');
  const typedLengthRef = useRef(0);
  const interval = useRef(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    typedLengthRef.current = typed.length;
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
              value: calculateWPM(typedLengthRef.current, _time)
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
          if (typed.length > 0) {
            setTyped(prev => prev.slice(0, -1));

            while (words[typed.length + 1] === '\t' && typed.length + 1 > 0) {
              setTyped(prev => prev.slice(0, -1));
            }
          }
          break;
        case 'Enter':
          if (words[typed.length] !== '\n') setErrors(prev => prev + 1);
          setTyped(prev => prev.concat('\n'));
          break;
        default:
          if (words[typed.length] !== key) setErrors(prev => prev + 1);
          setTyped(prev => prev.concat(key));
      }

      let aux = 1;
      if (key !== 'Backspace') {
        while (words[typed.length + aux] === '\t') {
          setTyped(prev => prev.concat('\t'));
          aux++;
        }
      }

      let _corrects = 0;
      for (let i = 0; i < typed.length; i++) {
        if (words[i] === typed[i]) {
          _corrects++;
        }
      }
      setCorrects(_corrects);

      if (state === 'run' && typed.length + 1 === words.length) {
        setState('finish');
        setWords('// -- Finish --\n\n// Press Tab to reset exercise\n\n');
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
    history
  };
};
