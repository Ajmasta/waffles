import Head from "next/head";
import Image from "next/image";
import FirstPanel from "../components/landing/FirstPanel";
import SecondPanel from "../components/landing/SecondPanel";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter&display=swap"
          rel="stylesheet"
        />
      </Head>
      <FirstPanel />
      <SecondPanel />
    </>
  );
}
