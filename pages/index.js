import Head from "next/head";
import { AppLayout } from "../components/AppLayout/AppLayout";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppLayout></AppLayout>
    </div>
  );
}
