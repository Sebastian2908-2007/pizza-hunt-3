const addDateSuffix = date => {
  let dateStr = date.toString();

  // get last char of date string
  const lastChar = dateStr.charAt(dateStr.length - 1);

  if (lastChar === '1' && dateStr !== '11') {
    dateStr = `${dateStr}st`;
  } else if (lastChar === '2' && dateStr !== '12') {
    dateStr = `${dateStr}nd`;
  } else if (lastChar === '3' && dateStr !== '13') {
    dateStr = `${dateStr}rd`;
  } else {
    dateStr = `${dateStr}th`;
  }

  return dateStr;
};

// function to format a timestamp, accepts the timestamp and an `options` object as optional parameters
module.exports = (
  timestamp,
  { monthLength = 'short', dateSuffix = true } = {}
) => {
  let months;

  if (monthLength === 'short') {
    months = {
      0: 'Jan',
      1: 'Feb',
      2: 'Mar',
      3: 'Apr',
      4: 'May',
      5: 'Jun',
      6: 'Jul',
      7: 'Aug',
      8: 'Sep',
      9: 'Oct',
      10: 'Nov',
      11: 'Dec'
    };
  } else {
    months = {
      0: 'January',
      1: 'February',
      2: 'March',
      3: 'April',
      4: 'May',
      5: 'June',
      6: 'July',
      7: 'August',
      8: 'September',
      9: 'October',
      10: 'November',
      11: 'December'
    };
  }

  const dateObj = new Date(timestamp);
  const formattedMonth = months[dateObj.getMonth()];

  let dayOfMonth;

  if (dateSuffix) {
    dayOfMonth = addDateSuffix(dateObj.getDate());
  } else {
    dayOfMonth = dateObj.getDate();
  }

  const year = dateObj.getFullYear();

  let hour;
  // check for 24-hr time
  // below simply does not work due to getHours not having () I added a switch statement to actually change the hours to the correct one based on the military time hour.
  // when I add the () to getHours it will start returning a single digit time but not the correct one for me ?
  if (dateObj.getHours > 12) {
    hour = Math.floor(dateObj.getHours() / 2);
  } else {
    hour = dateObj.getHours();
  }
  // if hour is 0 (12:00am), change it to 12
  /*if (hour === 0) {
    hour = 12;
  }*/

  switch(hour) {
    case  0:
      hour = 12;
      break;
    case  01:
      hour = 1;
      break;
    case  02:
      hour = 2;
      break;
    case  03:
      hour = 3;
      break;
    case  04:
      hour = 4;
      break;
    case  05:
      hour = 5;
      break;
    case  06:
      hour = 6;
      break;
    case  07:
      hour = 7;
      break;
    case  0:
      hour = 12;
      break;
    case  08:
      hour = 8;
      break;
    case  09:
      hour = 9;
      break;
    case  10:
      hour = 10;
      break;
    case 11:
      hour = 11;
      break;
    case  12:
      hour = 12;
      break;
    case  13:
      hour = 1;
      break;
    case  14:
      hour = 2;
      break;
    case  15:
      hour = 3;
      break;
    case  16:
      hour = 4;
      break;
    case  17:
      hour = 5;
      break;
    case  18:
      hour = 6;
      break;
    case  19:
      hour = 7;
      break;
    case  20:
      hour = 8;
      break;
    case  21:
      hour = 9;
      break;
    case  22:
      hour = 10;
      break;
    case  23:
      hour = 11;
      break;
    case  24:
      hour = 12;
      break;
  }

  let minutes = dateObj.getMinutes();

  switch(minutes) {
    case 1:
      minutes = '0' + dateObj.getMinutes();
      break;
    case 2:
      minutes = '0' + dateObj.getMinutes();
      break;
    case 3:
      minutes = '0' + dateObj.getMinutes();
      break;
    case 4:
      minutes = '0' + dateObj.getMinutes();
      break;
    case 5:
      minutes = '0' + dateObj.getMinutes();
      break;
    case 6:
      minutes = '0' + dateObj.getMinutes();
      break;
    case 7:
      minutes = '0' + dateObj.getMinutes();
      break;
    case 8:
      minutes = '0' + dateObj.getMinutes();
      break;
    case 9:
      minutes = '0' + dateObj.getMinutes();
      break;
  }

  // set `am` or `pm`
  let periodOfDay;

  if (dateObj.getHours() >= 12) {
    periodOfDay = 'pm';
  } else {
    periodOfDay = 'am';
  }

  const formattedTimeStamp = `${formattedMonth} ${dayOfMonth}, ${year} at ${hour}:${minutes} ${periodOfDay}`;

  return formattedTimeStamp;
};
