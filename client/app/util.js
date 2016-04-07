import moment from 'moment';

export function unixTimeToString(time) {
  return moment(time).format('ddd MMM D, h:mm A');
}

export function unixTimeFromNow(time) {
  return moment(time).fromNow();
}

/**
 * If shouldHide is true, returns a CSS class that hides the element.
 */
export function hideElement(shouldHide) {
  if (shouldHide) {
    return 'hidden';
  } else {
    return '';
  }
}
