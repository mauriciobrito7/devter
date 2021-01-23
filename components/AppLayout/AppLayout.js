import React from "react";
import { breakpoints, fonts, colors } from "../../styles/theme";
import { addOpacityToColor } from "../../styles/utils";

const backgroundColor = addOpacityToColor(colors.primary, 0.5);

export const AppLayout = ({ children }) => {
  console.log(backgroundColor);
  return (
    <>
      <div>
        <main>{children}</main>
      </div>

      <style jsx>
        {`
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
          }
          @media (min-width: ${breakpoints.mobile}) {
            main {
              height: 90vh;
              width: ${breakpoints.mobile};
            }
          }
        `}
      </style>
      <style jsx global>
        {`
          html,
          body {
            background-image: radial-gradient(
                ${backgroundColor} 1px,
                transparent 1px
              ),
              radial-gradient(${backgroundColor} 1px, transparent 1px);
            background-position: 0 0, 25px 25px;
            background-size: 50px 50px;
            padding: 0;
            margin: 0;
            font-family: ${fonts.base};
          }
          * {
            box-sizing: border-box;
          }
          a {
            color: inherit;
            text-decoration: none;
          }
        `}
      </style>
    </>
  );
};
