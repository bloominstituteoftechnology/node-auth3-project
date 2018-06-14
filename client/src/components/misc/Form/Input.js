import React from 'react';

const Input = props => {
  return (
    <input
      type={ props.inputType }
      name={ props.inputName }
      value={ props.inputValue }
      onChange={ props.inputOnChange }
      onClick={ props.inputOnClick }
    />
  );
};

export default Input;