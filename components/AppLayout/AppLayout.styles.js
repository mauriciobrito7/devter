import css from "styled-jsx/css";
import { breakpoints, fonts, colors } from "../../styles/theme";
import { addOpacityToColor } from "../../styles/utils";
const backgroundColor = addOpacityToColor(colors.primary, 0.5);

export const globalStyles = css.global`
  html,
  body {
    background-image: radial-gradient(${backgroundColor} 1px, transparent 1px),
      radial-gradient(${backgroundColor} 1px, transparent 1px);
    background-position: 0 0, 25px 25px;
    background-size: 50px 50px;

    font-family: ${fonts.base};
  }
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
  a {
    color: inherit;
    text-decoration: none;
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
    height: 90vh;
    width: 450px;
    position: relative;
  }
  @media (min-width: ${breakpoints.mobile}) {
    main {
      height: 90vh;
      width: ${breakpoints.mobile};
    }
  }
`;
