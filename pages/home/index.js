import { useEffect, useState } from "react";
import { Devit } from "components/Devit/Devit";
import useUser from "hooks/useUser";
import { fetchLatestDevits } from "utils/firebase";
import Link from "next/link";
import Create from "components/Icons/Create";
import { colors } from "../../styles/theme";
import Home from "components/Icons/Home";
import Search from "components/Icons/Search";
import Head from "next/head";

export default function HomePage() {
  const [timeline, setTimeline] = useState([]);
  const user = useUser();

  useEffect(() => {
    user && fetchLatestDevits().then(setTimeline);
  }, [user]);

  return (
    <>
      <Head>
        <title>Home / Devter</title>
      </Head>
      <header>
        <h2>Inicio</h2>
      </header>
      <section>
        {timeline.map(
          ({ id, userName, avatar, content, img, createdAt, userId }) => (
            <Devit
              avatar={avatar}
              id={id}
              key={id}
              content={content}
              img={img}
              userName={userName}
              createdAt={createdAt}
              userId={userId}
            />
          )
        )}
      </section>
      <nav>
        <Link href="/compose/tweet">
          <a>
            <Home width={32} height={32} stroke="#09f" />
          </a>
        </Link>
        <Link href="/compose/tweet">
          <a>
            <Search width={32} height={32} stroke="#09f" />
          </a>
        </Link>
        <Link href="/compose/tweet">
          <a>
            <Create width={32} height={32} stroke="#09f" />
          </a>
        </Link>
      </nav>

      <style jsx>{`
        header {
          background: #ffffffaa;
          backdrop-filter: blur(5px);
          border-bottom: 1px solid #eee;
          display: flex;
          align-items: center;
          position: sticky;
          top: -1px;
          padding: 16px 0;
          width: 100%;
          height: 50px;
        }
        section {
          flex: 1;
        }
        h2 {
          font-size: 21px;
          font-weight: 800;
          padding-left: 15px;
        }
        nav {
          background: #fff;
          bottom: -2px;
          border-top: 1px solid #eee;
          display: flex;
          height: 49px;
          position: sticky;
          width: 100%;
        }
        nav a {
          align-items: center;
          display: flex;
          flex: 1 1 auto;
          height: 100%;
          justify-content: center;
        }
        nav a:hover {
          background: radial-gradient(#0099ff22 15%, transparent 16%);
          background-size: 180px 180px;
          background-position: center;
        }
        nav a:hover > :global(svg) {
          stroke: ${colors.primary};
        }
      `}</style>
    </>
  );
}
