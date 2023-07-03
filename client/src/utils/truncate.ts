export const truncateText = (text: string, max = 80) => {
  return text.length > 20 ? text.substring(0, max) + '...' : text;
};
