// import  Moment from 'moment';
// import Moment from 'moment-timezone';
// import {} from 'moment-timezone';
// var a =  Moment.tz('Asia/Tehran')
import moment_jalaali from "moment-jalaali";
const get_date = (timestamp = null) => {
  if (timestamp === null) {
    return new Date().getTime();
    return moment_jalaali().unix();
  } else {
    let current_datetime = new Date(timestamp);
    let formatted_date =
      current_datetime.getDate() +
      "-" +
      (current_datetime.getMonth() + 1) +
      "-" +
      current_datetime.getFullYear()
      + ' '+current_datetime.getHours()+':'+current_datetime.getMinutes()+':'+current_datetime.getSeconds();
    // console.log(formatted_date);

    // console.log(moment_jalaali().format("jYYYY/jM/jD"));
      return moment_jalaali(formatted_date, "D-M-YYYY HH:mm:ss").format("HH:mm:ss jYYYY/jM/jD");

    
  }
};

export default get_date;
