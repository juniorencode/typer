export const formatTime = seconds => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  let result = '';
  if (minutes > 0) result += `${minutes}m `;
  if (remainingSeconds > 0 || minutes === 0) result += `${remainingSeconds}s`;

  return result.trim();
};

export const calculateCPM = (totalCharacters, seconds) => {
  const minutes = seconds / 60;
  return minutes > 0 ? Math.round(totalCharacters / minutes) : 0;
};

export const calculateWPM = (totalCharacters, seconds) => {
  return Math.round(calculateCPM(totalCharacters, seconds) / 5);
};

export const calculateAcc = (corrects, errors) => {
  return corrects || errors
    ? Math.round((corrects / (corrects + errors)) * 100)
    : 0;
};
