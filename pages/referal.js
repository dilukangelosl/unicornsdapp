import Head from "next/head";
import { Toaster } from "react-hot-toast";
import { useEagerConnect, useInactiveListener } from "../lib/hooks/web3Hook";
import MintPage from "../components/Main/MintPage";
import NavbarC from "../components/Navbar/NavbarC";

import ReferalComponent from "../components/Main/Referal";



export default function Home() {
 

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager);
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Head>
        <title>OG APES CLUB - Referal</title>
        <meta name="description" content="OGAC Referal" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="globalbody">
        <NavbarC/>
       <ReferalComponent/>
      </div>
    </>
  );
}
