import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 800px;
  margin: 40px auto;

  span {
    color: #ee4d64;
    align-self: self-start;
    margin: 0 0 10px;
    font-weight: bold;
  }
`;

export const Label = styled.label`
  font-style: normal;
  font-weight: bold;
  font-size: 13px;
  line-height: 16px;
  color: #444444;

  margin-bottom: 10px;
`;

export const InputControl = styled.label`
  text-align: left;
  margin: 10px;
`;

export const Content = styled.div`
  padding: 30px;
  background: #ffff;

  input {
    margin-top: 8px !important;
    padding: 0 15px;
    margin: 0 0 10px;
    height: 42px;
    width: 100%;

    border-radius: 4px;
    border: 0.8px solid #dddddd;

    background: #ffff;
    color: #454444;

    &::placeholder {
      color: #dddddd;
    }
  }
  input:read-only {
    background-color: #f5f5f5;
  }

  div.inputRow {
    display: flex;
    flex-direction: column;
  }

  div.inputColumn {
    display: flex;
    flex-direction: row;
  }
`;

export const ActionsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  margin-bottom: 30px;

  max-width: 1200px;
  width: 100%;

  p {
    font-size: 16pt;
    font-weight: bold;
    color: #444444;
  }

  button {
    margin-left: 10px;

    height: 35px;
    font-weight: bold;
    color: #fff;
    border: 0;
    border-radius: 4px;
    font-size: 13px;

    transition: backdround 0.2s;
    width: 100px;

    float: left;
    display: flex;
    justify-content: center;
    align-items: center;

    div {
      margin: 0 10px 0 10px;
    }

    &:hover {
      background: ${darken(0.02, '#ee4c63')};
    }
  }

  button#back {
    background: #bcbcbc;
  }

  button#save {
    background: #ee4d64;
  }
`;
