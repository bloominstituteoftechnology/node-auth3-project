import styled from 'styled-components';
import { Link } from 'react-router-dom'

export const Login = styled.div `
font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 24px;
line-height: 28px;


color: #5A4E4E;
mix-blend-mode: normal;
`
  
  export const Container = styled.div `



    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    box-shadow: 0px 0px 12px 2px rgba(15, 15, 15, 0.2);
    border-radius: 4px;
    position: relative;
    z-index: 99;
    width: 100%;
    height: 100%;
    z-index: 99;
    padding: 17px 10px;
    transition: transform 200ms ease-in-out;

  `
  export const Button = styled.button `
  font-size: 21px;
  padding: 5px 20px;
  border: 0;
  background-color: #DADADA;
  color: #fff;
  border-radius: 3px;
  transition: all 250ms ease-in-out;
  cursor: pointer;
  &:hover {
    background-color: #FFB90F;
  }
  &:focus {
    outline: none;
  `
  export const Otherbutton = styled(Link) `
  font-size: 9px;
  text-decoration: none;
  padding: 5px 20px;
  border: 0;
  background-color: #DADADA;
  color: black;
  border-radius: 3px;
  transition: all 250ms ease-in-out;
  cursor: pointer;
  &:hover {
    background-color: #FFB90F;
  }
  &:focus {
    outline: none;
  `

  export const Body = styled.p `
  
width: 30%;


    /* Body 2 / Roboto Regular */

    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    /* or 143% */

    letter-spacing: 0.25px;

    /* Smoke - Text */

    color: #5A4E4E;
    mix-blend-mode: normal;

  `

  export const Rectangle = styled.div `
  border: 1px solid rgba(25, 25, 25, 0.32);
box-sizing: border-box;
  
  `
 // turn into styled components and delete any duplicates

  export const Formgroup= styled.div `
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: fit-content;
  `

  export const Styledform = styled.div`
    display: flex;
    flex-direction: column;
  `

  export const Labels = styled.label `
  
  text-align: left;
  display: flex;
  flex-direction: column;`

 export const Inputs = styled.input `
 margin-top: 1px;
 min-width: 18em;
 height: 37px;
 padding: 0px 10px;
 font-size: 15px;
 font-family: "Open Sans", sans-serif;
 background-color: #f3f3f3;
 border: 0;
 border-radius: 4px;
 margin-bottom: 31px;
 transition: all 250ms ease-in-out;
 `
 
  
  

