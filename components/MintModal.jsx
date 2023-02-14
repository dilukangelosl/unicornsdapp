import React, { useState } from "react";
import { Modal } from "react-bootstrap";

export default function MintModal(props) {
  const [show, setShow] = useState(props.show);
  const handleClose = () => setShow(false);

  const transactionLink = `https://rinkeby.etherscan.io/tx/${props.hash}`;
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <div className="mintmodal">
            <img
              src="/success.png"
              className="mintmodalimage"
              alt="Mintmodalimage"
            />
            <h2>Mint submitted</h2>
            <h3>
              See the transaction on <a href={transactionLink}>Etherscan</a>
            </h3>
            <button className="btn btn-primary btn-round" onClick={handleClose}>
              Done
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
