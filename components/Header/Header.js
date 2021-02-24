import React from "react";

export const Header = ({ children, title }) => {
  return (
    <>
      <header>
        {children}
        {title && <h2>{title}</h2>}
      </header>
      <style jsx>{`
        header {
          background: #ffffffaa;
          backdrop-filter: blur(5px);
          border-bottom: 1px solid #eee;
          display: flex;
          align-items: center;
          justify-content: space-between;

          position: sticky;
          top: -1px;
          padding: 16px 10px;
          width: 100%;
          height: 50px;
        }
        svg {
          fill: #000;
        }
        h2 {
          font-size: 21px;
          font-weight: 800;
        }
      `}</style>
    </>
  );
};
