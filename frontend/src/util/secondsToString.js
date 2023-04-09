const secondsToString = (seconds) => {
  const format = (val) => Math.floor(val).toString().padStart(2, "0");

  const hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  const minutes = Math.floor(seconds / 60);
  seconds %= 60;

  return `${format(hours)}:${format(minutes)}:${format(seconds)}`;
};

export default secondsToString;
