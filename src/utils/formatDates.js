const { format, formatDistanceToNow } = require("date-fns");

const DATE_FORMAT = "dd-MM-yyyy";

const formatDate = (date) => {
  const inputDate = new Date(date);
  const formattedDate = format(inputDate, DATE_FORMAT);
  return formattedDate;
};

const formatTimeAgo = (date) => {
  const parsedDate = typeof date === "string" ? new Date(date) : date;

  if (isNaN(parsedDate.getTime())) {
    throw new Error("Invalid date");
  }

  return formatDistanceToNow(parsedDate, { addSuffix: true });
};

module.exports = { formatDate, formatTimeAgo };
