import { useEffect, useRef, useState } from 'react';
import {
  isKeyboardCodeAllowed,
  calculateWPM
} from '../utilities/utils.utilities';
import { data } from '../data';

export const useEngine = () => {
  const [words, setWords] = useState(data[7]);
  const [state, setState] = useState('start');
  const [time, setTime] = useState(0);
  const [errors, setErrors] = useState(0);
  const [corrects, setCorrects] = useState(0);
  const [history, setHistory] = useState([]);
  const [typed, setTyped] = useState('');
  const typedLength = useRef(0);
  const interval = useRef(null);

  useEffect(() => {
    window.addEventListener('keydown', handlerKeydown);
    return () => {
      window.removeEventListener('keydown', handlerKeydown);
    };
    // eslint-disable-next-line
  }, [state]);

  const handlerKeydown = e => {
    const { key, code } = e;

    if (!isKeyboardCodeAllowed(key, code)) return;
    if (['Tab', 'Space'].includes(code)) e.preventDefault();
    if (state === 'start') {
      setState('run');
      interval.current = setInterval(() => {
        setHistory(prev => {
          const _time = (prev[prev.length - 1]?.time || 0) + 1;
          return [
            ...prev,
            {
              time: _time,
              value: calculateWPM(typedLength.current, _time)
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
        setHistory([]);
        setTyped('');
        typedLength.current = 0;
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
          if (typedLength.current > 0) {
            setTyped(prev => prev.slice(0, -1));
            typedLength.current = typedLength.current - 1;

            while (
              words[typedLength.current] === '\t' &&
              typedLength.current > 0
            ) {
              setTyped(prev => prev.slice(0, -1));
              typedLength.current = typedLength.current - 1;
            }
          }
          break;
        case 'Enter':
          if (words[typedLength.current] !== '\n') setErrors(prev => prev + 1);
          setTyped(prev => prev.concat('\n'));
          typedLength.current = typedLength.current + 1;
          break;
        default:
          if (words[typedLength.current] !== key) setErrors(prev => prev + 1);
          setTyped(prev => prev.concat(key));
          typedLength.current = typedLength.current + 1;
          break;
      }

      if (key !== 'Backspace') {
        while (words[typedLength.current] === '\t') {
          setTyped(prev => prev.concat('\t'));
          typedLength.current = typedLength.current + 1;
        }
      }

      if (words[typedLength.current - 1] === key) {
        setCorrects(prev => prev + 1);
      }

      if (state === 'run' && typedLength.current === words.length) {
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
