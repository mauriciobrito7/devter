import { useEffect, useState } from "react";
import { AppLayout } from "components/AppLayout/AppLayout";
import { Devit } from "components/Devit/Devit";
import useUser from "hooks/useUser";

export default function HomePage() {
  const [timeline, setTimeline] = useState([]);
  const user = useUser();

  useEffect(() => {
    user &&
      fetch("/api/statuses/home_timeline")
        .then((res) => res.json())
        .then(setTimeline);
  }, [user]);

  return (
    <>
      <AppLayout>
        <header>
          <h2>Inicio</h2>
        </header>
        <section>
          {timeline.map(({ id, username, avatar, message }) => (
            <Devit
              avatar={avatar}
              id={id}
              key={id}
              message={message}
              username={username}
            />
          ))}
        </section>
        <nav></nav>
      </AppLayout>
      <style jsx>{`
        header {
          align-items: center;
          border-bottom: 1px solid #eee;
          background: #ffffffcc;
          backdrop-filter: blur(5px);
          height: 49px;
          display: flex;
          position: sticky;
          top: 0;
          width: 100%;
        }
        section {
        }
        h2 {
          font-size: 21px;
          font-weight: 800;
          padding-left: 15px;
        }
        nav {
          bottom: 0;
          border-top: 1px solid #eee;
          height: 49px;
          position: sticky;
          width: 100%;
          background: #fff;
        }
      `}</style>
    </>
  );
}
