export function formatTimePassed(time: Date | string | number) {
  const start = new Date(time);
  const end = new Date();

  const secondDiff = Math.floor((end.getTime() - start.getTime()) / 1000); //getTime() returns ms and divided by 1000 to get seconds
  if (secondDiff < 60) return "Just now";

  const minuteDiff = Math.floor(secondDiff / 60);

  if (minuteDiff < 60) return `${minuteDiff} mins ago`;

  const hourDiff = Math.floor(minuteDiff / 60);
  if (hourDiff < 24) return `${hourDiff} hours ago`;

  const dayDiff = Math.floor(hourDiff / 24);
  return `${dayDiff} days ago`;
}
