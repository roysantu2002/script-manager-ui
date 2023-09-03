import Head from "next/head";
import HomePage from "../src/components/Home";
export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='min-vh-100 bg-body'>
        <HomePage />
      </main>
    </>
  );
}