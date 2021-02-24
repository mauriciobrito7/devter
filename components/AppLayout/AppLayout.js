import { Nav } from "components/Nav/Nav";
import React from "react";
import styles, { globalStyles } from "./AppLayout.styles";
export const AppLayout = ({ children }) => {
  return (
    <>
      <div>
        <main>
          {children}
          <Nav />
        </main>
      </div>

      <style jsx>{styles}</style>
      <style jsx global>
        {globalStyles}
      </style>
    </>
  );
};
