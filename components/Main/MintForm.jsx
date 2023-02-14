import { useWeb3React } from "@web3-react/core";
import axios from "axios";
import { BigNumber } from "ethers";
import React, { useEffect } from "react";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import toast from "react-hot-toast";
import Web3 from "web3";
import { CrossmintPayButton } from "@crossmint/client-sdk-react-ui";

import {
  isPaused,
  getTotalSupply,
  getPrice,
  mint,
  MethGetPrice,
  methCheckAllowance,
  methApprove,
  mintWithMeth,
  methBalance,
  withdrawComic,
} from "../../lib/contractMethods";
import Currency from "./Currency";
import ConnectModal from "../Connect/ConnectModal";

export default function MintForm(props) {
  const { active, account, library } = useWeb3React();
  const [isLoading, setIsLoading] = useState(true);
  const [Paused, setPaused] = useState(false);
  const [currency, setCurrency] = useState(1);
  const [methApproved, setMethApproved] = useState(0);

  const [totalSupplu, setTotalSupply] = useState(0);
  const [refLoaded, setRefLoaded] = useState(false);
  const [price, setPrice] = useState(0);
  const [qty, setQty] = useState(1);
  const [refTo, setRefTo] = useState(null);

  const [show, setShow] = useState({
    show: false,
    title: "",
    link: "",
    progress: false,
    dismiss: false,
    buttonText: "",
  });

  const handleClose = () => setShow(false);

  const increase = () => {
    if (qty < 20) {
      setQty(qty + 1);
      setMethApproved(false);
    }
  };

  const decrease = () => {
    if (qty > 1) {
      setQty(qty - 1);
      setMethApproved(false);
    }
  };

  const howmanyfree = () => {
    if (qty >= 15) {
      return "+ 5 Free";
    } else if (qty >= 12) {
      return "+ 4 Free";
    } else if (qty >= 9) {
      return "+ 3 Free";
    } else if (qty >= 6) {
      return "+ 2 Free";
    } else if (qty >= 3) {
      return "+ 1 Free";
    } else {
      ("");
    }
  };

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
  useEffect(() => {
    if (active) {
      setTimeout(() => {
        getAccount();
        checkReferal();
      }, 100);
    }
  }, [active, account]);

  async function checkReferal() {
    let t = toast.loading("Checking account...");
    setRefLoaded(false);
    const ref = props.props.query?.ref;

    if (ref) {
      //reset ref
      const { data } = await axios.get(
        `https://api2.originalapeclub.io/api/v1/referal/link/${ref}`
      );
      if (data.data) {
        setRefTo(data.data.owner);
        localStorage.setItem("ref", data.data.owner);
      }
      toast.dismiss(t);
      setRefLoaded(true);
    } else {
      //check localstorage
      const item = localStorage.getItem("ref");
      if (item) {
        setRefTo(item);
      }
      toast.dismiss(t);
      setRefLoaded(true);
    }
  }

  async function getAccount() {
    try {
      setIsLoading(true);
      const a = await isPaused(library?.getSigner());
      const b = await getTotalSupply(library?.getSigner());
      const c = await getPrice(library?.getSigner());

      setPaused(a);
      setTotalSupply(parseInt(b.toString()));
      setPrice(Web3.utils.fromWei(c.toString(), "ether"));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error("Internal Server error");
      console.log(error);
    }
  }

  async function checkandApproveMeth() {
    var t = toast.loading("Checking if Approval needed...");
    try {
      const price = MethGetPrice(library?.getSigner());
      const cost = price * qty;

      const balance = await methBalance(account, library?.getSigner());
      if (balance <= cost) {
        toast.dismiss(t);
        return toast.error("Insufficient $METH");
      }

      //check allowance
      var allowance = await methCheckAllowance(account, library?.getSigner());
      allowance = BigNumber.from(allowance);

      if (allowance < cost + 1) {
        //should allow first
        toast.dismiss(t);
        t = toast.loading(
          "Approving Meth for the transaction..., Please do not close the browser"
        );
        var tx = await methApprove(cost, library?.getSigner());
        await tx.wait(1);
        setMethApproved(true);
      } else {
        setMethApproved(true);
      }
      toast.dismiss(t);
    } catch (error) {
      console.log(error);
      toast.dismiss(t);
      toast.error("Oops Something went wrong..");
    }
  }

  async function mintMethfunction() {
    try {
      if (!account) {
        return;
      }

      if (Paused) {
        return toast.error("Sale is not Active yet");
      }
      toast("Please wait..", {
        icon: "👏",
      });

      var tx;

      tx = await mintWithMeth(qty, library?.getSigner());

      showMintModal(
        true,
        "Mint submitted",
        `https://etherscan.io/tx/${tx.hash}`,
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
      await getAccount();
    } catch (error) {
      console.log(typeof error);
      console.log("Error", error.toString());
      toast.error("Oops Something went wrong..");

      showMintModal(false, "", "", false, true, "Close");
    }
  }

  async function mintfunction() {
    try {
      if (!account) {
        return;
      }

      if (Paused) {
        return toast.error("Sale is not Active yet");
      }
      toast("Please wait..", {
        icon: "👏",
      });
      var tx;

      tx = await mint(qty, library?.getSigner(), refTo);

      showMintModal(
        true,
        "Mint submitted",
        `https://etherscan.io/tx/${tx.hash}`,
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
      await getAccount();
    } catch (error) {
      console.log(typeof error);
      console.log("Error", error.toString());
      toast.error("Oops Something went wrong..");

      showMintModal(false, "", "", false, true, "Close");
    }
  }
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

      <div className="mintsection">
        <div className="mintpage__mainform__divider"></div>

        {Paused && <h1>Mint is Paused</h1>}
        {!Paused && (
          <>
            <div className="qtycontrols">
              <button className="btn btn-clear" onClick={decrease}>
                -
              </button>
              <span className="mintqty">{qty}</span>
              <button className="btn btn-clear bluebtn" onClick={increase}>
                +
              </button>
            </div>

            {active && (
              <div className="stats">{totalSupplu.toString()}/10000</div>
            )}

            <Currency
              initVal={currency}
              onSelected={(val) => {
                setCurrency(val);
                setMethApproved(false);
              }}
            />
            {!active && <ConnectModal />}

            {active && currency == 1 && (
              <button
                className="btn mintform__btn mintnow"
                disabled={!refLoaded}
                onClick={() => mintfunction()}
              >
                Mint
              </button>
            )}

            <CrossmintPayButton
              clientId="9382fb2b-5c2d-4c48-821d-e64d775869f5"
              mintConfig={{
                type: "erc-721",
                totalPrice: (qty * 0.16).toString(),
                _amount: qty,
              }}
              mintTo={account ? account : ""}
            
            />
          </>
        )}
      </div>
    </>
  );
}
