import React, { useState } from "react";
import TimePicker from "react-bootstrap-time-picker";
import moment from "moment-timezone";
import { Button, Form } from "react-bootstrap";
import { useWeb3React } from "@web3-react/core";
import ConnectModal from "../Connect/ConnectModal";
import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
export default function ReferalComponent() {
  const { account, active, library } = useWeb3React();
  const [referal, setReferal] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (active) {
      checkAccount();
    }
  }, [active, account]);

  async function checkAccount() {
    setLoaded(false);
    let t = toast.loading("Please waiting, loading account...")
    try {
       
      if (account) {
        const { data } = await axios.get(
          `https://api2.originalapeclub.io/api/v1/referal/${account}`
        );
        if (data.status) {
            console.log(data.data);
          setReferal(data.data);
          toast.dismiss(t)
        }else{
            toast.error("Internal Server error")
        }
        setLoaded(true);
        toast.dismiss(t)
      }
    } catch (error) {
        toast.dismiss(t)
        setLoaded(true);
      toast.error("Internal server Error");
    }
  }

  function containsSpecialChars(str) {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(str);
  }

  return (
    <div className="mintpage clock referal">
      <h1>OGAC REFERAL PROGRAM</h1>
      {!active && <ConnectModal />}
      {active && referal && <div className="yourref">
            <h4>Share your Link & Get paid 0.005ETH per Mint Instantly</h4>
           <strong> <p className="red">https://www.mintogac.com?ref={referal.link}</p></strong>
        </div>}
      {loaded && active && !referal && (
        <div className="reflink">
          <Form
            className="linkform"
            onSubmit={async (e) => {
              e.preventDefault();
              const l = e.target[0].value;
              if (l != null && l != "") {
                if(containsSpecialChars(l)) {
                    return toast.error("No Special characters Allowed")
                }
                const signedMessage = await library
                  ?.getSigner()
                  .signMessage(JSON.stringify({ sender: account }));

                let config = {
                  headers: {
                    Authorization: "Bearer " + signedMessage,
                  },
                };
                let loading = toast.loading("Please wait");
                const { data } = await axios.post(
                  `https://api2.originalapeclub.io/api/v1/referal/create`,
                  {
                    link: l,
                    sender: account,
                  },
                  config
                );

                if (data.status) {
                  setReferal(data.data);
                }else{
                    toast.error(data.message)
                }
                toast.dismiss(loading);
              }
            }}
          >
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Create your Referal Link</Form.Label>
              <Form.Control type="text" placeholder="Enter Referal Link" />
              <Form.Text className="text-muted">
                Link can be anything short eg: johndoe
              </Form.Text>
            </Form.Group>
            <Button type="submit" color="primary">
              Create Link
            </Button>
          </Form>
        </div>
      )}
    </div>
  );
}
