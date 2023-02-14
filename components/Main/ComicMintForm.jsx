import { useWeb3React } from "@web3-react/core";
import axios from "axios";
import { BigNumber } from "ethers";
import React, { useEffect } from "react";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import toast from "react-hot-toast";
import Web3 from "web3";
import {
  methApprove,
  methBalance,
  isComicPaused,
  comicTotalSupply,
  comicCost,
  mintComicWithMeth,
  mintComic,
  MethGetPriceComic,
  methCheckAllowanceComic,
  methComicApprove,
  comicIsClaimed,
  claimComic,
} from "../../lib/contractMethods";
import Currency from "./Currency";

export default function MintForm() {
  const { active, account, library } = useWeb3React();
  const [isLoading, setIsLoading] = useState(true);
  const [Paused, setPaused] = useState(false);
  const [currency, setCurrency] = useState(1);
  const [methApproved, setMethApproved] = useState(0);

  const [totalSupplu, setTotalSupply] = useState(0);
  const [price, setPrice] = useState(0);
  const [qty, setQty] = useState(1);
  const [isClaimedComics, setIsClaimedComics] = useState(true);
  const [proof, setProof] = useState([]);
  const [amount, setAmount] = useState(0);

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
    if (qty < 15) {
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
      }, 100);
    }
  }, [active, account]);

  async function getAccount() {
    try {
      setIsLoading(true);
      const a = await isComicPaused(library?.getSigner());
      const b = await comicTotalSupply(library?.getSigner());
      const c = await comicCost(library?.getSigner());

      setPaused(a);
      setTotalSupply(parseInt(b.toString()));
      setPrice(Web3.utils.fromWei(c.toString(), "ether"));

      //check claim api
      const { data } = await axios.get(
        `https://api.originalapeclub.io/comic/claims/${account}`
      );
      console.log("Claim data", data);
      if (data.status) {
        //check if already claimed
        const isAlreadyClaimed = await comicIsClaimed(
          account,
          library?.getSigner()
        );
        if (!isAlreadyClaimed) {
          setIsClaimedComics(false);
          setProof(data.proof);
          setAmount(data.amount);
        }
      }

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
      const price = MethGetPriceComic();
      const cost = price * qty;

      const balance = await methBalance(account, library?.getSigner());
      if (balance <= cost) {
        toast.dismiss(t);
        return toast.error("Insufficient $METH");
      }

      //check allowance
      var allowance = await methCheckAllowanceComic(
        account,
        library?.getSigner(),
        "0x1b51E5eD7b034282858B86318BED08DD84Ed79e4"
      );
      allowance = BigNumber.from(allowance);

      if (allowance < cost + 1) {
        //should allow first
        toast.dismiss(t);
        t = toast.loading(
          "Approving Meth for the transaction..., Please do not close the browser"
        );
        var tx = await methComicApprove(cost, library?.getSigner());
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

      tx = await mintComicWithMeth(qty, library?.getSigner());

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

      tx = await mintComic(qty, library?.getSigner());

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


  async function claimFunction() {
    try {
      if (!account) {
        return;
      }
      toast("Please wait..", {
        icon: "👏",
      });
      var tx;

      tx = await claimComic(amount,proof, library?.getSigner());

      showMintModal(
        true,
        "Claim submitted",
        `https://etherscan.io/tx/${tx.hash}`,
        true,
        false,
        ""
      );
      await tx.wait(1);
      showMintModal(
        true,
        "Claim Success",
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

            <div className="stats">{totalSupplu.toString()}/2500</div>

            <Currency
              initVal={currency}
              onSelected={(val) => {
                setCurrency(val);
                setMethApproved(false);
              }}
            />

            {currency == 1 && (
              <button
                className="btn mintform__btn mintnow"
                onClick={() => mintfunction()}
              >
                Mint {howmanyfree()}
              </button>
            )}

            {currency == 2 && (
              <>
                {!methApproved && (
                  <>
                    <button
                      className="btn mintform__btn mintnow"
                      onClick={() => {
                        checkandApproveMeth();
                      }}
                    >
                      Check & Approve $METH
                    </button>
                    <p className="info2">
                      This will check and Approve $METH that is required for
                      this transaction
                    </p>
                  </>
                )}

                {methApproved && (
                  <button
                    className="btn mintform__btn mintnow"
                    onClick={() => mintMethfunction()}
                  >
                    Mint With Meth {howmanyfree()}
                  </button>
                )}
              </>
            )}


            {!isClaimedComics && proof.length > 0 && <button
                className="btn mintform__btn mintnow"
                onClick={() => claimFunction()}
              >
                Claim {amount} Comics
              </button>}
            <div className="grindbanner">
              <marquee>
                <h2>
                  Join the grind Join the grind Join the grind Join the grind
                  Join the grind Join the grind
                </h2>
              </marquee>
            </div>
            <p className="info">
              Please note that you can mint only 15 per transaction
            </p>
          </>
        )}
      </div>
    </>
  );
}
