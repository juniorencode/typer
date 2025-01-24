import { useCallback, useEffect, useRef, useState } from 'react';
import {
  isKeyboardCodeAllowed,
  calculateWPM,
  getRandomFunction
} from '../utilities/utils.utilities';
import { data } from '../data';

export const useEngine = () => {
  const [words, setWords] = useState(getRandomFunction(data));
  const [state, setState] = useState('start');
  const [time, setTime] = useState(0);
  const [errors, setErrors] = useState(0);
  const [corrects, setCorrects] = useState(0);
  const [history, setHistory] = useState([]);
  const [typed, setTyped] = useState('');
  const typedLength = useRef(0);
  const interval = useRef(null);

  const reset = useCallback(() => {
    setState('start');
    setCorrects(0);
    setErrors(0);
    setHistory([]);
    setTyped('');
    typedLength.current = 0;
    setWords(getRandomFunction(data));
    setTime(0);
  }, []);

  const updateHistory = useCallback(() => {
    setHistory(prev => {
      const _time = (prev[prev.length - 1]?.time || 0) + 1;
      return [
        ...prev,
        { time: _time, value: calculateWPM(typedLength.current, _time) }
      ];
    });
  }, []);

  const update = useCallback(() => {
    setState('run');
    interval.current = setInterval(() => {
      updateHistory();
      setTime(prev => prev + 1);
    }, 1000);
  }, [updateHistory]);

  const handleTyping = useCallback(
    key => {
      if (key === 'Backspace') {
        if (typedLength.current > 0) {
          setTyped(prev => prev.slice(0, -1));
          typedLength.current -= 1;

          while (
            words[typedLength.current] === '\t' &&
            typedLength.current > 0
          ) {
            setTyped(prev => prev.slice(0, -1));
            typedLength.current -= 1;
          }
        }
      } else if (key === 'Enter') {
        if (words[typedLength.current] !== '\n') setErrors(prev => prev + 1);
        setTyped(prev => prev.concat('\n'));
        typedLength.current += 1;
      } else {
        if (words[typedLength.current] !== key) setErrors(prev => prev + 1);
        setTyped(prev => prev.concat(key));
        typedLength.current += 1;
      }

      if (key !== 'Backspace') {
        while (words[typedLength.current] === '\t') {
          setTyped(prev => prev.concat('\t'));
          typedLength.current += 1;
        }
      }

      if (words[typedLength.current - 1] === key) {
        setCorrects(prev => prev + 1);
      }

      if (typedLength.current === words.length) {
        setState('finish');
        setWords('// -- Finish --\n\n// Press Tab to reset exercise\n\n');
        clearInterval(interval.current);
      }
    },
    [words]
  );

  const handlerKeydown = useCallback(
    e => {
      const { key, code } = e;

      if (!isKeyboardCodeAllowed(key, code)) return;
      if (['Tab', 'Space'].includes(code)) e.preventDefault();
      if (state === 'start') update();
      if (key === 'Tab' && state === 'finish') reset();
      else if (key !== 'Tab' && state !== 'finish') handleTyping(key);
    },
    [state, handleTyping, reset, update]
  );

  useEffect(() => {
    window.addEventListener('keydown', handlerKeydown);
    return () => {
      window.removeEventListener('keydown', handlerKeydown);
    };
  }, [handlerKeydown]);

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
