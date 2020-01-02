import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  padding: 0 25px;
`;

export const Content = styled.div`
  height: 64px;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid #eee;
    }

    a {
      font-weight: bold;
      color: #999999;
      margin: 10px;
    }
  }

  p {
    font-size: 14px;
    color: #666666;
    text-align: left;
  }

  button#exit {
    color: #de3b3b;
    background: none;
    border: none;
    font-size: 12px;
  }

  aside {
    display: flex;
    align-items: center;
  }

  .active {
    color: #444444;
    font-weight: bold;
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;
  border-left: 1px solid #eee;

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #000;
    }

    a {
      display: block;
      margin-top: 2px;
      font-size: 12px;
      color: #999;
    }
  }
  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
  }
`;
