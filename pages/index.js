import Head from "next/head";
import HomePage from "../src/components/Home";
export default function Home() {
  return (
    <>
      <Head>
        <title>Network Script Manager</title>
        <meta name='description' content='Network Script Manager' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='min-vh-100 bg-body'>
        <HomePage />
      </main>
    </>
  );
}
