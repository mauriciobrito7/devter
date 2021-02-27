import React from "react";

const Footer = () => {
  return (
    <div>
      Proudly made in 🇻🇪 by &nbsp;
      <a
        href="https://www.linkedin.com/in/mauricio-brito-62b0a6140/"
        target="blind"
      >
        Mauricio Brito
      </a>
      <style jsx>{`
        div {
          width: 100%;
          height: 50px;
          top: calc(100vh - 50px);
          bottom: 0px;
          left: 0px;
          right: 0px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 1em;
          margin-bottom: 1em;
        }
        a {
          font-weight: bold;
          border-bottom: 2px solid #00ffcd;
        }
      `}</style>
    </div>
  );
};

export default Footer;
