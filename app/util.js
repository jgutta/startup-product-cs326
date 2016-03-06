import moment from 'moment';

export function unixTimeToString(time) {
  return moment(time).format('ddd MMM D, h:mm A');
}

export function unixTimeFromNow(time) {
  return moment(time).fromNow();
}
