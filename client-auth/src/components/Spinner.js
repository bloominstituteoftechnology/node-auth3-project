import React from 'react';

export const Spinner = props => (
  <div className='ui active inverted dimmer'>
    <div className='ui huge text loader'>{props.message}</div>
  </div>
);

Spinner.defaultProps = {
  message: 'Loading...'
};
