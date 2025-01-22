import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';

export const Caret = ({ words, length }) => {
  const caretRef = useRef(null);

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  const handleKeydown = () => {
    if (caretRef.current) {
      caretRef.current.classList.remove('caret-blink');
      void caretRef.current.offsetWidth;
      caretRef.current.classList.add('caret-blink');
    }
  };

  return (
    <span ref={caretRef} className="caret-blink bg-teal-700">
      {words[length] === '\n' ? '↵' : words[length]}
    </span>
  );
};

Caret.propTypes = {
  words: PropTypes.string.isRequired,
  length: PropTypes.number.isRequired
};
