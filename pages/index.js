import Head from "next/head";
import HomePage from "../src/components/Home";
import { useUser } from "../src/components/UserContext";
export default function Home() {
  const { user } = useUser();
  console.log(user);
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
