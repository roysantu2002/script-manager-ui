import Head from "next/head";
import HomePage from "../src/components/Home";
import { useUser } from "../src/components/UserContext";
export default function Home() {
  const { user } = useUser();
  return (
    <>
      <Head>
        <title>Network Script Manager</title>
        <meta name='description' content='Network Script Manager' />
        <link rel='icon' href='/favicon.ico' />
        <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
  />
      </Head>

      <main className='min-vh-100 bg-body'>
        <HomePage />
      </main>
    </>
  );
}
