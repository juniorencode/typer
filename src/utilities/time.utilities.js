export const formatTime = seconds => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  let result = '';
  if (minutes > 0) result += `${minutes}m `;
  if (remainingSeconds > 0 || minutes === 0) result += `${remainingSeconds}s`;

  return result.trim();
};
