import React from "react";
import styles, { globalStyles } from "./AppLayout.styles";
export const AppLayout = ({ children }) => {
  return (
    <>
      <div>
        <main>{children}</main>
      </div>

      <style jsx>{styles}</style>
      <style jsx global>
        {globalStyles}
      </style>
    </>
  );
};
