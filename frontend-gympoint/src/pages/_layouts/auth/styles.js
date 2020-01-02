import styled from 'styled-components';
import { darken, lighten } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: ${lighten(0.02, '#ee4d64')};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 400px;
  text-align: center;
  background: #ffffff;
  padding-top: 50px;
  padding-bottom: 50px;
  padding-left: 40px;
  padding-right: 40px;
  border-radius: 5px;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    strong {
      text-align: left;
      margin-bottom: 10px;
      margin-top: 15px;
      font-weight: bold;
      color: #444444;
    }
  }

  input {
    background: #ffffff;
    border-color: black;
    border: 0px;
    border-radius: 4px;
    height: 44px;
    padding: 0 15px;
    color: #444444;
    margin: 0 0 10px;
    border: 0.8px solid #dddddd;

    &::placeholder {
      color: #999999;
    }
  }

  span {
    color: ${darken(0.1, '#ee4c63')};
    align-self: self-start;
    margin: 0 0 10px;
    font-weight: bold;
  }

  button {
    margin: 5px 0 0;
    height: 44px;
    background: #ee4d64;
    font-weight: bold;
    color: #fff;
    border: 0;
    border-radius: 4px;
    font-size: 16px;
    transition: backdround 0.2s;

    &:hover {
      background: ${darken(0.02, '#ee4c63')};
    }
  }
`;
