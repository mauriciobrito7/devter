import { useState, useEffect } from "react";
import Head from "next/head";
import { AppLayout } from "../components/AppLayout/AppLayout";
import { Button } from "../components/Button/Button";
import GitHub from "../components/Icons/GitHub";
import { colors } from "../styles/theme";

import { loginWithGitHub, onAuthStateChanged } from "../utils/firebase";

export default function Home() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    onAuthStateChanged((user) => setUser(user));
  }, []);

  const handleClick = () => {
    loginWithGitHub()
      .then((user) => {
        setUser(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Head>
        <title>devter 🐦 </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppLayout>
        <section>
          <h1>Devter</h1>
          <h2>
            Talk about development <br /> with developers 👩‍💻 👨‍💻
          </h2>
          <div>
            {user === null && (
              <Button onClick={handleClick}>
                <GitHub fill="#fff" width={24} height={24} />
                Login with Github
              </Button>
            )}
            {user && user.avatar && (
              <div>
                <img src={user.avatar} />
                <strong>{user.username}</strong>
              </div>
            )}
          </div>
        </section>
      </AppLayout>

      <style jsx>{`
        section {
          display: grid;
          height: 100%;
          place-content: center;
          place-items: center;
        }

        h1 {
          color: ${colors.primary};
          font-weight: 900;
          margin-bottom: 1em;
        }
        h2 {
          font-size: 18px;
          color: ${colors.secondary};
          margin-bottom: 1em;
        }
      `}</style>
    </>
  );
}
