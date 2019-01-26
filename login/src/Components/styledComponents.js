import styled from 'styled-components';

export const Button = styled.button`
    width: 15%;
    height: 5vh;
    font-size: 16px;
    font-weight: bold;
    margin-top: 20px;
    background-color: #FDF0D5;
    border: 2px solid #FDF0D5
    &:hover{
        background-color: #F0544F;
        border: 2px solid #F0544F;
        color: #FDF0D5;
    }
`;

export const Input = styled.input`
    height: 3vh;
    width: 25%;
    margin-bottom: 15px;
`;