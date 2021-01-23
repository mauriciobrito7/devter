import React from "react";
import { fonts } from "../../styles/theme";
export const AppLayout = ({ children }) => {
  return (
    <>
      <main>{children}</main>
      <style jsx global>
        {`
          html,
          body {
            padding: 0;
            margin: 0;
            font=family: ${fonts.base};
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
