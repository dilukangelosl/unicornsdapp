import React, { useEffect, useState } from "react";
import { FaDiscord, FaSpeakerDeck, FaTiktok, FaTwitter } from "react-icons/fa";
import { setCookie, getCookie } from "cookies-next";
import { useWeb3React } from "@web3-react/core";
import ConnectModal from "./Connect/ConnectModal";
import { Modal } from "react-bootstrap";
import toast from "react-hot-toast";
import {
  getAllInfo,
  mint,
  mintRef,
  mintWhitelist,
  mintWhitelistRef,
} from "../lib/contractMethods";
import {
  TwitterTimelineEmbed,
  TwitterShareButton,
  TwitterFollowButton,
  TwitterHashtagButton,
  TwitterMentionButton,
  TwitterTweetEmbed,
  TwitterMomentShare,
  TwitterDMButton,
  TwitterVideoEmbed,
  TwitterOnAirButton,
} from "react-twitter-embed";

export default function RefMint(props) {
  const API = `https://iv9p3n7954.execute-api.ap-southeast-1.amazonaws.com/prod/api/v1/referal`;

  const [qty, setqty] = useState(1);
  const [proof, setProof] = useState([]);
  const [refData, setRefData] = useState(props.data);

  const [isLoading, setLoading] = useState(false);
  const { account, active, library } = useWeb3React();
  const [whitelistDataLoading, setWhitelisDataLoading] = useState(true);
  const [show, setShow] = useState({
    show: false,
    title: "",
    link: "",
    progress: false,
    dismiss: false,
    buttonText: "",
  });

  const [info, setInfo] = useState({
    totalSupply: 40,
    maxSupply: 0,
    cost: 0,
    whitelistCost: 0,
    whiteListingSale: false,
    maxMintAmountPerTransaction: 1,
    paused: false,
    maxMintAmountPerWallet: 1,
    maxMintAmountPerWhitelist: 1,
  });

  useEffect(() => {
    if (active) {
      setTimeout(() => {
        getEngine();
      }, 500);
    }
  }, [active, account]);

  const handleClose = () => setShow(false);

  async function getEngine() {
    toast("Loading... please wait");
    setLoading(true);
    const data = await getAllInfo(library?.getSigner());
    console.log(data);
    setInfo(data);
    if (data.whiteListingSale) {
      setWhitelisDataLoading(false);
    } else {
      setWhitelisDataLoading(false);
    }
    setLoading(false);
    toast("Contract loaded");
  }

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

  async function increment() {
    if (qty < 10) {
      setqty(qty + 1);
    }
  }

  function decrease() {
    if (qty > 1) {
      setqty(qty - 1);
    }
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

  async function mintfunction() {
    try {
      if (!account) {
        return;
      }

      if (info.paused) {
        return toast.error("Sale is not Active yet");
      } else if (info.whiteListingSale) {
        if (proof.length == 0) {
          return toast.error("Your address is not whitelisted");
        }
      }

      toast("Please wait..", {
        icon: "👏",
      });
      var tx;

      if (refData != null) {
        console.log("Minting ref");
        if (info.whiteListingSale) {
          console.log("Minting ref");
          tx = await mintWhitelistRef(
            qty,
            proof,
            refData.owner,
            library?.getSigner()
          );
        } else {
          tx = await mintRef(
            qty,
            library?.getSigner(),
            account,
            refData.data.owner
          );
        }
      } else {
        console.log(info);
        if (info.whiteListingSale) {
          tx = await mintWhitelist(qty, proof, library?.getSigner(), account);
        } else {
          tx = await mint(qty, library?.getSigner(), account);
        }
      }

      showMintModal(
        true,
        "Mint submitted",
        `https://goerli.etherscan.io/tx/${tx.hash}`,
        true,
        false,
        ""
      );
      await tx.wait(1);
      showMintModal(
        true,
        "Mint Success",
        `https://etherscan.io/tx/${tx.hash}`,
        false,
        true,
        "Done"
      );
    } catch (error) {
      console.log(typeof error);
      console.log("Error", error.toString());
      if (error.toString().includes("execution reverted")) {
        toast.error("Please contact Admins");
      } else {
        toast.error("Insufficient funds or Transaction Error");
      }

      showMintModal(false, "", "", false, true, "Close");
    }
  }
  //test
  return (
    <>
      <div className="mintmodalcontainer">
        <Modal show={show.show} onHide={handleClose} className="mymodal">
          <Modal.Body>
            <div className="mintmodal">
              <img
                src="/success.png"
                className="mintmodalimage"
                alt="Mintmodalimage"
              />

              <h2>{show.title}</h2>
              <h3>
                See the transaction on{" "}
                <a href={show.link} target="_blank" rel="noreferrer">
                  Etherscan
                </a>
              </h3>
              {show.progress && (
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only"></span>
                </div>
              )}
              <h3>{show.body}</h3>

              {show.dismiss && (
                <button className="btn herobtn" onClick={handleClose}>
                  {show.buttonText}
                </button>
              )}
            </div>
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
              <div className="qtycontrols">
                <button className="btn btn-clear" onClick={decrease}>
                  -
                </button>
                <span className="mintqty">{qty}</span>
                <button className="btn btn-clear bluebtn" onClick={increment}>
                  +
                </button>
              </div>
              <button
                className="btn btn-primary btn-large refmintbtn"
                onClick={() => {
                  mintfunction();
                }}
              >
                Mint
              </button>
              <a
                href="/ref"
                className="btn btn-primary btn-large refmintbtn reflink"
              >
                Only 10 Affliate spots available
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
