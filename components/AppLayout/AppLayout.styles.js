import css from "styled-jsx/css";
import { breakpoints, fonts, colors } from "../../styles/theme";
import { addOpacityToColor } from "../../styles/utils";
const backgroundColor = addOpacityToColor(colors.primary, 0.5);

export const globalStyles = css.global`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
  html,
  body {
    background-image: radial-gradient(${backgroundColor} 1px, transparent 1px),
      radial-gradient(${backgroundColor} 1px, transparent 1px);
    background-position: 0 0, 25px 25px;
    background-size: 50px 50px;
    overflow: hidden;
    font-family: ${fonts.base};
  }
  textarea,
  input {
    font-family: ${fonts.base};
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  ::-webkit-scrollbar {
    height: 16px;
  }
`;

export default css`
  div {
    display: grid;
    height: 100vh;
    place-items: center;
  }

  main {
    background: #fff;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    height: 100vh;
    width: 100%;
    overflow-y: auto;
    position: relative;
    display: flex;
    flex-direction: column;
  }
  @media (min-width: ${breakpoints.mobile}) {
    main {
      width: ${breakpoints.mobile};
    }
  }

  @media (min-width: ${breakpoints.tablet}) {
    main {
      height: 90vh;
      width: ${breakpoints.tablet};
    }
  }
`;
