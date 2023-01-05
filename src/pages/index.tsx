import { NextPage } from "next";
import Head from "next/head";
import { Dashboard } from "../components/Dashboard";
import { Layout } from "../components/layout/Layout";
// import { useGlobalStore } from "../store/global/globalStore";

const Home: NextPage = () => (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const client = useGlobalStore((state) => state.client);
  // const { data } = useQueryPosts();

  <Layout>
    <Head>
      <title>Create Next App</title>
      <meta name="description" content="Generated by create next app" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Dashboard />
  </Layout>
);
export default Home;
