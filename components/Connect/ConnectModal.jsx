import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useWallet } from "../../lib/hooks/wallet";

export default function ConnectModal() {
  useEffect(() => {
    const isMetaMaskInstalled = () => {
      const { ethereum } = window;
      if (!ethereum) {
        setIsMetaMaskInstalled(false);
      } else {
        setIsMetaMaskInstalled(true);
      }
    };
    isMetaMaskInstalled();
  }, []);

  const { connectWallet, account, disconnectWallet, active } = useWallet();

  const [show, setShow] = useState(false);
  const [isMetamaskInstalled, setIsMetaMaskInstalled] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function connect(m) {
    await connectWallet(m);
    setShow(false);
  }
  async function disconnect() {
    await disconnectWallet();
  }

  function loadMetamaskbutton() {
    if (!isMetamaskInstalled) {
      return (
        <a
          className="btn btn-clear"
          href="https://metamask.app.link/dapp/unicornsdapp.vercel.app/"
        >
          <img src="/mbtn.png" alt="metamask button" width="40" /> Metamask
        </a>
      );
    } else {
      return (
        <button
          className="btn btn-clear"
          onClick={() => {
            console.log("Login");
            connect(0);
          }}
        >
          <img src="/mbtn.png" alt="metamask button" width="40" /> Metamask
        </button>
      );
    }
  }

  function showLoginButtons() {
    if (!active) {
      return (
        <>
          <button className="btn mintform__btn" onClick={handleShow}>
            Connect Wallet
          </button>
        </>
      );
    } else {
      return (
        <button
          className="btn mintform__btn"
          onClick={() => {
            disconnect();
          }}
        >
          Logout
        </button>
      );
    }
  }

  return (
    <>
      {showLoginButtons()}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Connect Wallet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="connectbtns">
            {loadMetamaskbutton()}
            <button
              className="btn btn-clear wlpadding walletc"
              onClick={() => {
                console.log("Login");
                connect(1);
              }}
            >
              <img src="/wbtn.png" alt="metamask button" width="40" /> Wallet
              Connect
            </button>

            <button
              className="btn btn-clear wlpadding"
              onClick={() => {
                console.log("Login");
                connect(2);
              }}
            >
              <img src="/coin.png" alt="metamask button" width="40" /> Coinbase
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
