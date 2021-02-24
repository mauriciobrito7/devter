import { Devit } from "components/Devit/Devit";
import React from "react";
import { firestore } from "utils/admin";
import { useRouter } from "next/router";
import Head from "next/head";
import { Header } from "components/Header/Header";
import ArrowLeft from "components/Icons/ArrowLeft";

const DevitPage = (props) => {
  const router = useRouter();
  if (router.isFallback) return <h1>Loading...</h1>;
  return (
    <>
      <Head>
        <title>{props.userName}</title>
      </Head>
      <Header>
        <ArrowLeft onClick={() => router.back()} />
      </Header>
      <Devit {...props} />
      <style jsx>
        {`
          article {
            flex: 1;
          }
        `}
      </style>
    </>
  );
};

export default DevitPage;

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "2v6O59t32Pr9Kxt1cykC" } }],
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  const { id } = params;

  return firestore
    .collection("devits")
    .doc(id)
    .get()
    .then((doc) => {
      const data = doc.data();
      const id = doc.id;
      const { createdAt } = data;

      const props = {
        ...data,
        id,
        createdAt: +createdAt.toDate(),
      };
      return { props };
    })
    .catch(() => {
      return { props: {} };
    });
}
