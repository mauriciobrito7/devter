import Head from "next/head";
import { AppLayout } from "../components/AppLayout/AppLayout";
import { Button } from "../components/Button/Button";
import GitHub from "../components/Icons/GitHub";
import { colors } from "../styles/theme";

export default function Home() {
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
            <Button>
              <GitHub fill="#fff" width={24} height={24} />
              Login with Github
            </Button>
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
