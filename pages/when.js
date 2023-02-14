import Head from "next/head";
import { Toaster } from "react-hot-toast";
import { useEagerConnect, useInactiveListener } from "../lib/hooks/web3Hook";
import MintPage from "../components/Main/MintPage";
import NavbarC from "../components/Navbar/NavbarC";
import { useEffect, useState, useRef } from "react";
import { useWeb3React } from "@web3-react/core";
import { getTotalSupply } from "../lib/contractMethods";
import ConnectModal from "../components/Connect/ConnectModal";
import useSound from 'use-sound'
import AudioPlayer from 'react-h5-audio-player';

export default function Home() {
  const [play] = useSound('/audio.wav');
  const audioRef = useRef();
  const audioRef2 = useRef();
    const { account, active, library } = useWeb3React();
  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager);
    const [t, setT] = useState(0);

  async function getdetails(){
     if(account){
      try {
        const a =  await getTotalSupply(library?.getSigner())
        console.log(a.toString(),t.toString())
        if(t.toString() !== a.toString()){
          if(audioRef.current){
            audioRef.current.play()
          }

          if(parseInt(a.toString()) > 4155){
            if(audioRef2.current){
              //audioRef2.current.play()
            }
          }
        }
        setT(a);
       
        console.log(t.toString())
      } catch (error) {
        
      }
     }
  }

  useEffect(() => {
    const timer = window.setInterval(() => {
      getdetails()
    }, 5000);
    return () => {
      window.clearInterval(timer);
    };
  }, [active,t]);
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Head>
        <title>OWhen</title>
        <meta name="description" content="OGAC Mint" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="globalbody">
      <div className="mintpage">
      <audio src="/audio.wav" autoPlay={false} ref={audioRef} />
      <audio src="/alarm.mp3" autoPlay={false} ref={audioRef2} />
         <div className="container when">
        
        
         {!active && <ConnectModal/>}
         <h1>{t!== 0 && <span>{4177 - parseInt(t.toString())}</span>}</h1>
         </div>
        </div>
      </div>
    </>
  );
}
