import React from "react";
import LogoSection from "./LogoSection";

import { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import ConnectModal from "../Connect/ConnectModal";
import ComicMintForm from "./ComicMintForm";


export default function ComicMintPage() {
  const { account, active, library } = useWeb3React();
  const [isPaymentEth, setIsPaymentEth] = useState(true);
  return (
    <div className="mintpage">
      <div className="container">
        <div className="mintpage__mainform">
        <div className="mintpage__mainform_logo">
              <img src="/ogaccomic.jpeg" alt="" />
            </div>
            <h1>Mint COMIC - 0.015 ETH | 300 $METH</h1>
            <div className="info2 logotext">MINT 3 AND GET 1 FREE</div>

          <div className="mintcontrols">
            {active && <ComicMintForm/>}
            <ConnectModal />
            </div>
        </div>
      </div>
    </div>
  );
}
