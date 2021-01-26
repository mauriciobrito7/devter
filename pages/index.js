import { useState, useEffect } from "react";
import Head from "next/head";
import { AppLayout } from "components/AppLayout/AppLayout";
import { Button } from "components/Button/Button";
import GitHub from "components/Icons/GitHub";
import Logo from "components/Icons/Logo";
import { colors } from "styles/theme";

import { loginWithGitHub, onAuthStateChanged } from "utils/firebase";
import { Avatar } from "components/Avatar/Avatar";

export default function Home() {
  const [user, setUser] = useState(undefined);
  useEffect(() => {
    onAuthStateChanged((user) => setUser(user));
  }, []);

  const handleClick = () => {
    loginWithGitHub()
      .then(setUser)
      .catch((err) => {
        console.log(err);
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
          <Logo width="100px" />
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
                <Avatar
                  alt={user.username}
                  src={user.avatar}
                  text={user.username}
                />
              </div>
            )}
          </div>
        </section>
      </AppLayout>

      <style jsx>{`
        img {
          width: 120px;
        }
        section {
          display: grid;
          height: 100%;
          place-content: center;
          place-items: center;
        }

        h1 {
          color: ${colors.primary};
          font-weight: 800;
          font-size: 32px;
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
