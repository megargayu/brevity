const secondsSinceDay = (date) => {
  return date.getSeconds() + 60 * date.getMinutes() + 60 * 60 * date.getHours();
};

export default secondsSinceDay;
