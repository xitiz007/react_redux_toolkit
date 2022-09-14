import { parseISO, formatDistanceToNow } from "date-fns";

const TimeAgo = ({ date }) => {
  let timeAgo = "";
  if (date) {
    const dateObj = parseISO(date);
    const timePeriod = formatDistanceToNow(dateObj);
    timeAgo = `${timePeriod} ago`;
  }
  return (
    <span title={date}>
      &nbsp; <i>{timeAgo}</i>
    </span>
  );
};

export default TimeAgo;
