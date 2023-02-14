import React, { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import ConnectModal from "./Connect/ConnectModal";
import { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import toast from "react-hot-toast";
const API = `https://iv9p3n7954.execute-api.ap-southeast-1.amazonaws.com/prod/api/v1/referal`;

export default function Referal() {
  const { account, active, library } = useWeb3React();
  const [hasDomain, setHasDomain] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [accountDetails, setAccountDetails] = useState(null);
  const [domain, setDomain] = useState("");
  const [formLoading, setFormloading] = useState(false);
  const [formError, setFormError] = useState("");
  useEffect(() => {
    if (active) {
      setIsLoading(true);
      setTimeout(() => {
        getAccount();
      }, 500);
    }
  }, [active, account]);

  async function getAccount() {
    if (active) {
      try {
        setIsLoading(true);
        const response = await axios.get(`${API}/refs/owner/${account}`);
        const data = response.data;
        console.log("Data", data);
        setIsLoading(false);
        if (data.statusCode == 200) {
          if (data.data.data != null) {
            setAccountDetails(data.data.data);
            setHasDomain(true);
          } else {
            setHasDomain(false);
            setAccountDetails(null);
          }
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        setIsLoading(false);
        //show error
        toast.error(error.message);
      }
    }
  }

  function getCreateForm() {
    return (
      <Form
        onSubmit={async (e) => {
          try {
            e.preventDefault();
            setFormError("");
            setFormloading(true);
            const response = await axios.get(`${API}/domain/${domain}`);
            const data = response.data;
            setFormloading(false);
            if (data.statusCode == 200) {
              if (data.data.data != null) {
                setFormError("Domain not available");
              } else {
                //create referal Link
                const response = await axios.post(API, {
                  domain: domain,
                  owner: account,
                });

                const data = response.data;
                if (data.statusCode == 200) {
                  setFormloading(false);
                  getAccount();
                } else {
                  throw new Error(data.message);
                }
              }
            }
          } catch (error) {
            toast.error(error.message);
            setFormloading(false);
          }
        }}
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Enter Unique Referal</Form.Label>
          <Form.Control
            required={true}
            type="text"
            placeholder="eg: abc, xyz, eth"
            onChange={(e) => {
              if (formError != "") {
                setFormError("");
              }
              setDomain(e.target.value);
            }}
          />
          <h3 className="exampleref">
            {typeof window !== "undefined" && window.location.origin
              ? window.location.origin + "?ref=" + domain
              : ""}
          </h3>

          {formError !== "" && <h3 className="formerror">{formError}</h3>}
          <Form.Text className="text-muted">
            Once Referal is created, It will be bind to your address and cannot
            be changed
          </Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit" className="sbt">
          Create Referal Link{" "}
          {formLoading && (
            <div className="spinner-border" role="status">
              <span className="sr-only"></span>
            </div>
          )}
        </Button>
      </Form>
    );
  }

  return (
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
        <div className="container refinfo">
          {hasDomain && (
            <div className="accountinfo">
              <table className="table table-borderless">
                <tbody>
                  <tr>
                    <th scope="row">Owner</th>
                    <td>{account}</td>
                  </tr>
                  <tr>
                    <th scope="row">Domain</th>
                    <td>
                      {typeof window !== "undefined" && window.location.origin
                        ? window.location.origin +
                          "?ref=" +
                          accountDetails.domain
                        : ""}
                    </td>
                  </tr>

                  <tr>
                    <th scope="row">Transactions</th>
                    <td>{accountDetails.transactions?.length}</td>
                  </tr>

                  <tr>
                    <th scope="row">Sales</th>
                    <td>
                      {accountDetails.sales ? accountDetails.sales : 0} ETH
                    </td>
                  </tr>
                </tbody>
              </table>
              <br></br>
             
             {accountDetails?.transactions?.length > 0 && 
              <table class="table">
              <thead>
                <tr>
                  <th scope="col">Transactions</th>
                </tr>
              </thead>
              <tbody>
                {accountDetails.transactions.map(item => {
                  return <tr>
                  <td><a href={`https://goerli.etherscan.io/tx/${item}`} target="_blank">{item}</a></td>
                </tr>
                })}
              </tbody>
            </table>}
            </div>
          )}

          {!hasDomain && (
            <div className="createref">
              <div className="createrefform">
                <h2>Create a referal Link</h2>
                {getCreateForm()}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
