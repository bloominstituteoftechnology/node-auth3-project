import React, { useState } from 'react';
import './Form.css';

const useInputValue = (initialValue) => {
  const [value, setValue] = useState(initialValue)

  return {
    value,
    onChange: e => setValue(e.target.value)
  };
}

export const Form = (props) => {
  const {
    inputs,
    onSubmit,
    formTitle,
    action
  } = props
  // const forms = {};
  // Object.entries(inputs).forEach((input) => {
  //   forms[input[0]] = useInputValue(input[1])
  // })
  const username = useInputValue(inputs.username)
  const password = useInputValue(inputs.password)
   return (
    <div className="note-form">
      <form onSubmit={e => {
        e.preventDefault();
        // const output = Object.entries(forms).reduce((obj, input) => obj[input[0]] = input[1].value)
        const output = {
          username: username.value,
          password: password.value
        }
        console.log(output)
        onSubmit(output)
      }}>
        <h2>{formTitle}</h2>
        <input {...username} />
        <input {...password} />
        {/*Object.entries(forms).map((form, i) => (
          <input key={i} {...form[1]} className={form[0]} />
        ))*/}
        <button type="submit">{action}</button>
      </form>
    </div>
  )
}

      /* 
      
      <input {...username} className="title"/>
      <input {...password} className="textBody"/>
*/