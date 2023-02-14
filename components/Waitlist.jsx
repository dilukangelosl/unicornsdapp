import React, { useEffect, useState } from "react";
import { FaDiscord, FaSpeakerDeck, FaTiktok, FaTwitter } from "react-icons/fa";

import { useWeb3React } from "@web3-react/core";
import ConnectModal from "./Connect/ConnectModal";
import { Modal } from "react-bootstrap";
import toast from "react-hot-toast";

import {
  TwitterTimelineEmbed,
} from "react-twitter-embed";
import WaitlistForm from "./WaitlistForm";

export default function Waitlist(props) {
 
 

  const [isLoading, setLoading] = useState(false);
  const { account, active, library } = useWeb3React();
 
  const [show, setShow] = useState({
    show: false,
    title: "",
    link: "",
    progress: false,
    dismiss: false,
    buttonText: "",
  });



  useEffect(() => {
    if (active) {
      setTimeout(() => {
       
      }, 500);
    }
  }, [active, account]);

  const handleClose = () => setShow(false);

 
  function showMintModal(state, title, link, progress, dismiss, buttonText) {
    setShow({
      show: state,
      title,
      link,
      progress,
      dismiss,
      buttonText,
    });
  }



  function getsocialicons() {
    return (
      <div className="refsocialicons">
        <a href="#">
          <FaTwitter />
        </a>

        <a href="#">
          <FaDiscord />
        </a>

        <a href="#">
          <FaTiktok />
        </a>

        <a href="#">
          <FaSpeakerDeck />
        </a>
      </div>
    );
  }

 
 
  return (
    <>
      <div className="mintmodalcontainer">
        <Modal show={show.show} onHide={handleClose} className="mymodal">
          <Modal.Body>
                <WaitlistForm account={account} closeForm={ () => {
                    setShow({...show, show:false})
                }}/>
          </Modal.Body>
        </Modal>
      </div>
      <div className="contentcontainer">
        {!active && (
          <div className="connectsection">
            <h3>Please Connect Wallet</h3>
            <ConnectModal />
          </div>
        )}
        {isLoading && (
          <div className="spinner-border" role="status">
            <span className="sr-only"></span>
          </div>
        )}

        {!isLoading && active && (
          <div className="refmintcontainer">
            <div className="reflogo">
              <h1>TECXNO KINGS</h1>
            </div>
            <div className="imagesection">
              {getsocialicons()}
              <div className="refvideo">
                
                <TwitterTimelineEmbed
                  sourceType="profile"
                  screenName="elonmusk"
                  noHeader={true}
                  theme="light"
                  noBorders={true}
                  options={{ height: 400 }}
                />
                <div className="videolverlay"></div>
                <img src="/refavatar.png" alt=""  className="videoavatar"/>
              </div>
              {getsocialicons()}
            </div>

            <div className="mintcontrols">
              
              <button
                className="btn btn-primary btn-large refmintbtn"
                onClick={() => {
                  setShow({...show,show:true});
                }}
              >
                JOIN WAITLIST
              </button>
              <a
                href="/ref"
                className="btn btn-primary btn-large refmintbtn reflink"
              >
                X Spots Left<br></br>Wont Reopen
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
