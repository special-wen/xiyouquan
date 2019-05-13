export default date => {
  let newDate = new Date(date);
  let year = newDate.getFullYear() % 100;
  let month = newDate.getMonth() + 1;
  let day = newDate.getDate();
  let hour = newDate.getHours();
  let minute = newDate.getMinutes();
  date = year + "-" + month + "-" + day + " " + hour + ":" + minute;
  return date;
};
