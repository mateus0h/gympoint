import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
`;

export const Content = styled.div`
  background: #fff;
  margin-top: 30px;
  border-radius: 4px;
  padding: 30px;
  max-width: 1200px;
  width: 100%;
`;

export const StudentsTable = styled.table`
  width: 100%;

  thead th {
    color: #444444;
    font-weight: bold;
    padding: 12px;
    text-align: left;
  }

  tbody td {
    padding: 12px;
    border-bottom: 1px solid #eee;
    color: #666666;
  }

  tbody td#buttons {
    text-align: right;
  }

  thead th#idadeTh {
    text-align: center !important;
  }

  tbody td#idadeTd {
    text-align: center;
  }

  img {
    height: 100px;
  }

  strong {
    color: #333;
    display: block;
  }

  span {
    display: block;
    margin-top: 5px;
    font-size: 18px;
    font-weight: bold;
  }

  a {
    background: none;
    border: 0;
    padding: 6px;
  }

  a#edit {
    color: #4d85ee;
  }

  button#delete {
    color: #de3b3b;
    background: none;
    border: none;
  }
`;

export const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  max-width: 1200px;
  width: 100%;

  p {
    font-size: 16pt;
    font-weight: bold;
    color: #444444;
  }

  button {
    height: 35px;
    background: #ee4d64;
    font-weight: bold;
    color: #fff;
    border: 0;
    border-radius: 4px;
    font-size: 13px;
    transition: backdround 0.2s;
    width: 142px;

    /* align text button */
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

  input {
    background: #ffffff;
    border-color: black;
    border: 0px;
    border-radius: 4px;
    height: 36px;
    padding: 0 15px;
    color: #444444;
    border: 0.8px solid #dddddd;

    margin-left: 15px;
    text-align: center;

    /* align text button */
    float: left;
    display: flex;
    justify-content: center;
    align-items: center;

    &::placeholder {
      color: #999999;
    }
  }

  #lupa {
    float: left;
    margin: 10px 0px 0px -180px;
  }
`;
