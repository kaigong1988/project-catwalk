const axios = require('axios');
const moment = require('moment');

const recordClick = (string) => {
  let stringSplit = string.split(' ');
  let midStep = stringSplit[stringSplit.length - 1];
  let toRec = midStep.split('-');
  let widget = toRec[0];
  let element = toRec[1];
  let time = moment().format('h:mm:ss a');
  let reqBod = {
    element: element,
    widget: widget,
    time: time,
  };

  axios
    .post(`http://3.21.164.220/interactions`, reqBod)
    .then(() => {
      console.log('DATA SUCCESSFULLY RECORDED');
    })
    .catch((err) => {
      console.log('THERE WAS AN ERROR RECORDING DATA:', err);
    });
};

// axios({
//     method: 'post',
//     url: 'http://3.21.164.220/interations',
//     data: {
//       element: element,
//       widget: widget,
//       time: time
//     }
//   })

export { recordClick };
