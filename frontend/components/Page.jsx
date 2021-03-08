import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Header from './Header';
const GlobalStyles = createGlobalStyle`
  html {
    --maxWidth: 1000px;
    --bs: 0 12px 24px 0 rgba(0,0,0,0.09);
    box-sizing: border-box;
    font-size: 62.5%;
  }

  *, *:before, *:after{
    box-sizing: inherit;
  }

  body{
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height:2;
  }
  a{
    text-decoration:none;
    color: var(--black);
  }
  a:hover{
    text-decoration: underline;
  }
  ul {
    list-style:none;
  }
  button {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }
`;

const InnerStyles = styled.div`
  max-width: var(--maxWidth);
  margin: 0 auto;
  padding: 2rem;
`;

export default function Page({ children }) {
  return (
    <div>
      <GlobalStyles />
      <Header />
      <InnerStyles>{children}</InnerStyles>
    </div>
  );
}
