import 'react-count-animation/dist/count.min.css';
import React from 'react';
import AnimationCount from 'react-count-animation';

const Count = () => {
  const settings = {
    start: 20,
    count: 0,
    duration: 29999,
    decimals: 0,
    useGroup: true,
    animation: 'roll',
  };

  return (
    <div>
      <div className='exam-div'>
        <AnimationCount {...settings} />
      </div>
    </div>
  );
};

export default Count;
