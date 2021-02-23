import { Devit } from "components/Devit/Devit";
import React from "react";
import { firestore } from "utils/admin";
import { useRouter } from "next/router";

const DevitPage = (props) => {
  const router = useRouter();
  if (router.isFallback) return <h1>Cargando...</h1>;
  return (
    <>
      <Devit {...props} />
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
