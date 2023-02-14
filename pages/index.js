import Head from "next/head";
import { Toaster } from "react-hot-toast";
import { useEagerConnect, useInactiveListener } from "../lib/hooks/web3Hook";
import MintPage from "../components/Main/MintPage";
import NavbarC from "../components/Navbar/NavbarC";

export async function getServerSideProps(context) {
 
  return {props: {query: context.query || null}}
  // will be passed to the page component as props
}

export default function Home(props) {
 
  
  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager);
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Head>
        <title>Love story Unicorns - MINT</title>
        <meta name="description" content="Love story Unicorns Official Mint" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="globalbody">
       
       <MintPage props={props}/>
      </div>
    </>
  );
}
