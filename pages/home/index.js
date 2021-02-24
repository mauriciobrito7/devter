import { useEffect, useState } from "react";
import { Devit } from "components/Devit/Devit";
import { Header } from "components/Header/Header";
import { Nav } from "components/Nav/Nav";
import useUser from "hooks/useUser";
import { listenLatestDevits } from "utils/firebase";

import Head from "next/head";

export default function HomePage() {
  const [timeline, setTimeline] = useState([]);
  const user = useUser();

  useEffect(() => {
    let unsubscribe;

    if (user) {
      unsubscribe = listenLatestDevits((newDevits) => {
        setTimeline(newDevits);
      });
    }

    return () => unsubscribe && unsubscribe();
  }, [user]);

  return (
    <>
      <Head>
        <title>Home / Devter</title>
      </Head>
      <Header title="Inicio" />
      <section>
        {timeline.length > 0 &&
          timeline.map(
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

      <style jsx>{`
        section {
          flex: 1;
        }
      `}</style>
    </>
  );
}
