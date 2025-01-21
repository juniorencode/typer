import PropTypes from 'prop-types';
import { cn } from '../../utilities/styles.utilities';

export const Character = ({ actual, expected }) => {
  const isCorrect = actual === expected;
  const isWhiteSpace = expected === ' ';
  const isEnterKey = expected === '\n';

  return (
    <span
      className={cn({
        'text-red-400': !isCorrect && isEnterKey,
        'text-red-500': !isCorrect && !isWhiteSpace,
        'bg-red-500/50': !isCorrect && (isWhiteSpace || isEnterKey)
      })}
    >
      {expected === '\n' ? (!isCorrect ? '↵\n' : ' \n') : expected}
    </span>
  );
};

Character.propTypes = {
  actual: PropTypes.string.isRequired,
  expected: PropTypes.string.isRequired
};
