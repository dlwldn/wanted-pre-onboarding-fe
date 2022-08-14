import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
    ${reset};

    * {
        box-sizing: border-box;
    }
    li {
        list-style: none;
    }
    input {
        outline: none;
    }
    button {
        background: transparent;
        border: none;
        cursor: pointer;
    }
`;

export default GlobalStyle;
