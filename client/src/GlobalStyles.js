import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
* {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
}

html, body, div,
input, button, select, option,
h1, h2, h3, h4, h5, h6, p,
text {
  font-family: sans-serif;
}

html, body {
    max-width: 100vw;
    margin: 0;
}

article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
      display: block;
  }

button, div, textarea {
    outline: none;
}

`;

export const styling = {
    violet: "#4C00FF",
    lightviolet: "#AD91FD",
    lavender: "#EEE7FE",
    darkgrey: "#505050",
    lightgrey: "#DEDEDE",

    border: "1px solid #D3D3D3",

    focusOutline: "2px solid #005aeb"

};