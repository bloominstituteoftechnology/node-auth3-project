import React from 'react';

let currDate = new Date();
let currYear = currDate.getFullYear();
const months = ['January', 'Februay', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let currMonth = months[currDate.getMonth()];
let currDay = currDate.getDay();
let currHour = currDate.getHours();
let currMin = (currDate.getMinutes().toString()).length === 1 ? '0' + currDate.getMinutes(): currDate.getMinutes();
let currLocation = (Intl.DateTimeFormat().resolvedOptions().timeZone).split('/').join(': ').split('_').join(' ');


const Home = () => (
  <div className='timeAndLocation'>
    <h3 className='currTime'>{currHour}:{currMin}</h3>
    <h3>{currMonth} {currDay}, {currYear}</h3>
    <h3>{currLocation}</h3>
  </div>
)

export default Home;