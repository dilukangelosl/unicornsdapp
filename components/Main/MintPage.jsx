import React from "react";
import LogoSection from "./LogoSection";

import { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import ConnectModal from "../Connect/ConnectModal";
import MintForm from "./MintForm";


export default function MintPage(props) {
  const { account, active, library } = useWeb3React();
  const [isPaymentEth, setIsPaymentEth] = useState(true);
  return (
    <div className="mintpage">
      <div className="container">
        <div className="mintpage__mainform">
          <LogoSection />
          <div className="mintcontrols">
            <MintForm props={props.props}/>
            {active && <ConnectModal/>}
            </div>
        </div>
      </div>
    </div>
  );
}
