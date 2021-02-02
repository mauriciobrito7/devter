import { Avatar } from "components/Avatar/Avatar";

export const Devit = ({ avatar, userName, content, id, createdAt, userId }) => {
  return (
    <>
      <article>
        <div>
          <Avatar alt={userName} src={avatar} />
        </div>
        <section>
          <header>
            <strong>{userName}</strong>
            <span>{createdAt}</span>
          </header>
          <p>{content}</p>
        </section>
      </article>
      <style jsx>{`
        article {
          bord er-bottom: 1px solid #eee;
          display: flex;
          padding: 10px 15px;
        }
        div {
          padding-right: 10px;
        }
        p {
          line-height: 1.3125;
          margin: 0;
        }
        span {
          color:#555;
          font-size: 14px;
        }
      `}</style>
    </>
  );
};
