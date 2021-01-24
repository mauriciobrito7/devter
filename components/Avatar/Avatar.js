import React from "react";

export const Avatar = ({ alt, src, text }) => {
  return (
    <div className="container">
      <img className="avatar" alt={alt} src={src} title={alt} />

      {text && <strong>{text}</strong>}

      <style jsx>{`
        .container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .avatar {
          border-radius: 9999px;
          height: 49px;
          width: 49px;
        }

        .avatar + strong {
          margin-left: 8px;
        }
      `}</style>
    </div>
  );
};
