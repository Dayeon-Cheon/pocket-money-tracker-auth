import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
body{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 30px;
    background-color: #FFE1C0;
    min-width: 1200px;
}`;

export default GlobalStyle;
